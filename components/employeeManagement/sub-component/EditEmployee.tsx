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
import { FiChevronLeft, FiChevronRight, FiSave } from "react-icons/fi";

const EditEmployee = ({
  initialValues,
}: {
  initialValues: Employee | null;
}) => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [step, setStep] = useState<"basic-info" | "salary-info">("basic-info");
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
    initialize: (
      values:
        | Partial<EditEmployeeFormValues>
        | ((values: EditEmployeeFormValues) => Partial<EditEmployeeFormValues>)
    ) => void;
  } | null>(null);

  console.log("initialValues from edit employee", initialValues);

  const [updateEmployee, { isLoading: isUpdatingEmployee }] =
    useUpdateEmployeeMutation();

  // Build normalized initial form values using available option lists
  const { departmentOptions, positionOptions } = useConstantData();

  const handleNext = () => {
    setStep("salary-info");
  };

  const handlePrevious = () => {
    setStep("basic-info");
  };

  const steps = [
    { id: "basic-info", label: "Basic Information", number: 1 },
    { id: "salary-info", label: "Salary Information", number: 2 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

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
      firstName: (employeeData.firstName as string) || "",
      lastName: (employeeData.lastName as string) || "",
      email: (employeeData.email as string) || "",
      phone: (employeeData.phone as string) || "",
      address: (employeeData.address as string) || "",
      emergencyContactName: (employeeData.emergencyContactName as string) || "",
      emergencyContactPhone:
        (employeeData.emergencyContactPhone as string) || "",
      status: (employeeData.status as string) || "",
      startDate: startDateForInput || "",
      departmentId:
        (employeeData.departmentId as number | string | undefined) ??
        findIdByLabel(
          departmentOptions,
          employeeData.department as string | undefined
        ),
      positionId:
        (employeeData.positionId as number | string | undefined) ??
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
      weeklyHours:
        typeof employeeData.weeklyHours === "number"
          ? employeeData.weeklyHours
          : undefined,
      workingDaysPerWeek:
        typeof employeeData.workingDaysPerWeek === "number"
          ? employeeData.workingDaysPerWeek
          : undefined,
      gradeLevelId:
        typeof employeeData.gradeLevelId === "number"
          ? employeeData.gradeLevelId
          : employeeData.gradeLevelId
          ? Number(employeeData.gradeLevelId)
          : undefined,
      salaryBandId:
        typeof employeeData.salaryBandId === "number"
          ? employeeData.salaryBandId
          : employeeData.salaryBandId
          ? Number(employeeData.salaryBandId)
          : undefined,
      employmentTypeId:
        typeof employeeData.employmentTypeId === "number"
          ? employeeData.employmentTypeId
          : employeeData.employmentTypeId
          ? Number(employeeData.employmentTypeId)
          : undefined,
      customSalary:
        typeof employeeData.customSalary === "number"
          ? employeeData.customSalary
          : undefined,
      workScheduleTypeId:
        typeof employeeData.workScheduleTypeId === "number"
          ? employeeData.workScheduleTypeId
          : employeeData.workScheduleTypeId
          ? Number(employeeData.workScheduleTypeId)
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
      /*  if (values.firstName !== original.firstName) {
        payload.firstName = values.firstName;
      }
      if (values.lastName !== original.lastName) {
        payload.lastName = values.lastName;
      } */
      if (values.emergencyContactName !== original.emergencyContactName) {
        payload.emergencyContactName = values.emergencyContactName;
      }
      if (values.emergencyContactPhone !== original.emergencyContactPhone) {
        payload.emergencyContactPhone = values.emergencyContactPhone;
      }
      if (values.weeklyHours !== original.weeklyHours) {
        payload.weeklyHours = values.weeklyHours;
      }
      if (values.workingDaysPerWeek !== original.workingDaysPerWeek) {
        payload.workingDaysPerWeek = values.workingDaysPerWeek;
      }
      if (values.gradeLevelId !== original.gradeLevelId) {
        payload.gradeLevelId = values.gradeLevelId;
      }
      if (values.salaryBandId !== original.salaryBandId) {
        payload.salaryBandId = values.salaryBandId;
      }
      if (values.employmentTypeId !== original.employmentTypeId) {
        payload.employmentTypeId = values.employmentTypeId;
      }
      if (values.customSalary !== original.customSalary) {
        payload.customSalary = values.customSalary;
      }
      if (values.workScheduleTypeId !== original.workScheduleTypeId) {
        payload.workScheduleTypeId = values.workScheduleTypeId;
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
        showCancelBtn={false}
        showSubmitBtn={false}
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
              <div>
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-4">
                  {steps.map((stepItem, index) => (
                    <React.Fragment key={stepItem.id}>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                            index <= currentStepIndex
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {stepItem.number}
                        </div>
                        <span
                          className={`ml-2 text-sm font-medium ${
                            index <= currentStepIndex
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        >
                          {stepItem.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-4 ${
                            index < currentStepIndex
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <EditEmployeeForm
                  handleSubmit={handleSubmit}
                  step={step}
                  form={form}
                  submitting={submitting}
                />
                {/* Step Navigation Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={isFirstStep}
                    className={`flex items-center gap-2 px-4 py-2 rounded-sm font-medium transition-all ${
                      isFirstStep
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <FiChevronLeft />
                    Previous
                  </button>

                  {!isLastStep ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-4 py-2 rounded-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    >
                      Next
                      <FiChevronRight />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (formRef) {
                          formRef.submit();
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    >
                      <FiSave />
                      Update Employee
                    </button>
                  )}
                </div>
              </div>
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default EditEmployee;
