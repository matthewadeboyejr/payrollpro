import AddNewEmployeeForm from "@/components/forms/AddNewEmployeeForm";
import {
  AddNewEmployeeFormValues,
  EditEmployeeFormValues,
  EditUserFormValues,
} from "@/components/types/formFields";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import {
  useAddNewEmployeeMutation,
  useUpdateEmployeeMutation,
} from "@/services/api/constants/employee.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import {
  addNewEmployeeConstraints,
  editEmployeeConstraints,
} from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";
import { Employee } from "@/components/types/employment";
import EditEmployeeForm from "@/components/forms/EditEmployeeForm";

const EditEmployee = ({
  initialValues,
}: {
  initialValues: Employee | null;
}) => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<any>(null);

  const [updateEmployee, { isLoading: isUpdatingEmployee }] =
    useUpdateEmployeeMutation();

  // Build normalized initial form values using available option lists
  const { departmentOptions, positionOptions } =
    require("@/hooks/useConstantData").default();

  const normalizedInitialValues = useMemo(() => {
    if (!initialValues) return undefined;

    const findIdByLabel = (
      options: Array<{ value: any; label: string }> | undefined,
      label?: string | null
    ) => {
      if (!options || !label) return undefined;
      return options.find((opt) => opt.label === label)?.value;
    };

    // Format start date for <input type="date"> as YYYY-MM-DD; treat sentinel as empty
    const raw = (initialValues as any).startDate as string | undefined;
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
      email: (initialValues as any).email || "",
      phone: (initialValues as any).phone || "",
      address: (initialValues as any).address || "",
      status: (initialValues as any).status || "",
      startDate: startDateForInput || "",
      departmentId:
        (initialValues as any).departmentId ??
        findIdByLabel(departmentOptions, (initialValues as any).department),
      positionId:
        (initialValues as any).positionId ??
        findIdByLabel(positionOptions, (initialValues as any).position),
      annualSalary:
        typeof (initialValues as any).annualSalary === "number"
          ? (initialValues as any).annualSalary
          : undefined,
      ratePerHour:
        typeof (initialValues as any).ratePerHour === "number"
          ? (initialValues as any).ratePerHour
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
      } catch (err: any) {
        const errorMessage =
          err?.data?.message ||
          err?.message ||
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
