import { EditEmployeeFormValues } from "@/components/types/formFields";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { useUpdateEmployeeMutation } from "@/services/api/constants/employee.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { editEmployeeConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";
import { Employee } from "@/components/types/employment";
import EditEmployeeForm from "@/components/forms/EditEmployeeForm";
import useConstantData from "@/hooks/useConstantData";

const EditEmployee = ({
  initialValues,
}: {
  initialValues: Employee | null;
}) => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
    initialize: (
      values:
        | Partial<EditEmployeeFormValues>
        | ((values: EditEmployeeFormValues) => Partial<EditEmployeeFormValues>)
    ) => void;
  } | null>(null);

  const [updateEmployee, { isLoading: isUpdatingEmployee }] =
    useUpdateEmployeeMutation();

  // Build normalized initial form values using available option lists
  const { departmentOptions, positionOptions } = useConstantData();

  const normalizedInitialValues = useMemo(() => {
    if (!initialValues) return undefined;

    const findIdByLabel = (
      options: Array<{ value: string; label: string }> | undefined,
      label?: string | null
    ) => {
      if (!options || !label) return undefined;
      return options.find((opt) => opt.label === label)?.value;
    };

    // Format start date for <input type="date"> as YYYY-MM-DD; treat sentinel as empty
    const employeeData = initialValues as Employee & Record<string, unknown>;
    const raw = employeeData.startDate as string | undefined;
    let startDateForInput: string | undefined = undefined;
    if (raw && raw !== "0001-01-01T00:00:00") {
      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        const pad = (n: number) => String(n).padStart(2, "0");
        startDateForInput = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
          d.getDate()
        )}`;
      }
    }

    return {
      email: (employeeData.email as string) || "",
      phone: (employeeData.phone as string) || "",
      address: (employeeData.address as string) || "",
      status: (employeeData.status as string) || "",
      startDate: startDateForInput || "",
      departmentId:
        (employeeData.departmentId as string | undefined) ??
        findIdByLabel(
          departmentOptions,
          employeeData.department as string | undefined
        ),
      positionId:
        (employeeData.positionId as string | undefined) ??
        findIdByLabel(
          positionOptions,
          employeeData.position as string | undefined
        ),
      annualSalary:
        typeof employeeData.annualSalary === "number"
          ? employeeData.annualSalary
          : undefined,
      ratePerHour:
        typeof employeeData.ratePerHour === "number"
          ? employeeData.ratePerHour
          : undefined,
    } as Partial<EditEmployeeFormValues>;
  }, [initialValues, departmentOptions, positionOptions]);

  const validateForm = (values: EditEmployeeFormValues) => {
    return validate(values, editEmployeeConstraints) || undefined;
  };

  useEffect(() => {
    if (formRef && normalizedInitialValues && isModalOpen) {
      formRef.initialize(normalizedInitialValues);
    }
  }, [normalizedInitialValues, formRef, isModalOpen]);

  const buildChangedPayload = useCallback(
    (
      values: EditEmployeeFormValues,
      original: NonNullable<typeof normalizedInitialValues>
    ): Partial<EditEmployeeFormValues> => {
      const payload: Partial<EditEmployeeFormValues> = {};

      if (values.email !== original.email) {
        payload.email = values.email;
      }
      if (values.phone !== original.phone) {
        payload.phone = values.phone;
      }

      if (values.departmentId !== original.departmentId) {
        payload.departmentId = values.departmentId;
      }
      if (values.positionId !== original.positionId) {
        payload.positionId = values.positionId;
      }
      if (values.annualSalary !== original.annualSalary) {
        payload.annualSalary = values.annualSalary;
      }
      if (values.ratePerHour !== original.ratePerHour) {
        payload.ratePerHour = values.ratePerHour;
      }
      if (values.status !== original.status) {
        payload.status = values.status;
      }
      if (values.address !== original.address) {
        payload.address = values.address;
      }
      if (values.startDate !== original.startDate) {
        payload.startDate = values.startDate;
      }
      return payload;
    },
    []
  );

  const onSubmitEditEmployee = useCallback(
    async (values: EditEmployeeFormValues) => {
      if (!initialValues?.id) {
        showAlert("Error", "User ID is required", "error");
        return;
      }

      if (!normalizedInitialValues) {
        showAlert("Error", "Initial values are required", "error");
        return;
      }

      const payload = buildChangedPayload(values, normalizedInitialValues);

      if (Object.keys(payload).length === 0) {
        showAlert("Info", "No changes detected", "info");
        return;
      }

      try {
        const response = await updateEmployee({
          employeeId: initialValues.id,
          data: payload,
        }).unwrap();

        if (response?.code === 200 || response?.code === 201) {
          showAlert(
            "Success",
            response.message || "Employee updated successfully",
            "success"
          );
          formRef?.reset();
        }
      } catch (err: unknown) {
        const error = err as { data?: { message?: string }; message?: string };
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Employee editing failed. Please try again.";
        showAlert("Error", errorMessage, "error");
      } finally {
        setIsModalOpen(null);
        setFormRef(null);
      }
    },
    [
      initialValues,
      normalizedInitialValues,
      updateEmployee,
      formRef,
      setIsModalOpen,
      buildChangedPayload,
    ]
  );

  return (
    <div>
      <Modal
        size={"2xl"}
        heading={`Edit ${initialValues?.fullName || ""} Details`}
        desc={"Fill in the form to edit the employee details"}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isUpdatingEmployee}
      >
        <Form<EditEmployeeFormValues>
          onSubmit={onSubmitEditEmployee}
          validate={validateForm}
          initialValues={normalizedInitialValues}
          render={({ handleSubmit, form, submitting }) => {
            // Store form reference for modal submit
            if (!formRef) {
              setFormRef(form);
            }

            return (
              <EditEmployeeForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default EditEmployee;
