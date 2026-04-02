import AddNewEmployeeForm from "@/components/forms/AddNewEmployeeForm";
import { AddNewEmployeeFormValues } from "@/components/types/formFields";
import React, { useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { useAddNewEmployeeMutation } from "@/services/api/constants/employee.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { addNewEmployeeConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface FormRef {
  reset: () => void;
  submit: () => void;
}

const AddEmployee = () => {
  const router = useRouter();
  const { setIsModalOpen } = useModal();
  const [step, setStep] = useState<"basic-info" | "salary-info">("basic-info");
  const [formRef, setFormRef] = useState<FormRef | null>(null);

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

  const [addNewEmployee, { isLoading: isAddingEmployee }] =
    useAddNewEmployeeMutation();

  const onSubmitNewEmployee = async (values: AddNewEmployeeFormValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      emergencyContactName: values.emergencyContactName,
      emergencyContactPhone: values.emergencyContactPhone,
      startDate: values.startDate
        ? new Date(values.startDate).toISOString()
        : undefined,
      departmentId: values.departmentId,
      positionId: values.positionId,
      ratePerHour: values.ratePerHour,
      annualSalary: values.annualSalary,
      weeklyHours: values.weeklyHours,
      workingDaysPerWeek: values.workingDaysPerWeek,
      gradeLevelId: values.gradeLevelId,
      salaryBandId: values.salaryBandId,
      employmentTypeId: values.employmentTypeId,
      customSalary: values.customSalary,
      workScheduleTypeId: values.workScheduleTypeId,
    };

    try {
      const response = await addNewEmployee(payload).unwrap();
      console.log("response", response);
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "success");

        // Extract new employee ID from response
        const newEmployeeId = response?.data?.id || response?.data?.employee?.id;

        // Reset form after successful submission
        if (formRef) {
          formRef.reset();
        }

        // Navigate to employee details page with Tax tab active
        if (newEmployeeId) {
          router.push(`/dashboard/employees-management/${newEmployeeId}?tab=tax`);
        }
      }
    } catch (err: unknown) {
      const error = err as { data?: string; message?: string };
      const errorMessage =
        error?.data ||
        error?.message ||
        "Employee addition failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setIsModalOpen(null);
      setFormRef(null);
    }
  };

  const validateForm = (values: AddNewEmployeeFormValues) => {
    return validate(values, addNewEmployeeConstraints) || undefined;
  };

  return (
    <div>
      <Modal
        size={"2xl"}
        heading={"New Employee"}
        desc={"Add a new employee to the system"}
        onClose={() => setIsModalOpen(null)}
        showCancelBtn={false}
        showSubmitBtn={false}
        isSubmitting={isAddingEmployee}
      >
        <Form<AddNewEmployeeFormValues>
          onSubmit={onSubmitNewEmployee}
          validate={validateForm}
          render={({ handleSubmit, form, submitting }) => {
            // Store form reference for modal submit
            if (!formRef) {
              setFormRef(form);
            }

            return (
              <div className="" >
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-4">
                  {steps.map((stepItem, index) => (
                    <React.Fragment key={stepItem.id}>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${index <= currentStepIndex
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                            }`}
                        >
                          {stepItem.number}
                        </div>
                        <span
                          className={`ml-2 text-sm font-medium ${index <= currentStepIndex
                            ? "text-blue-500"
                            : "text-gray-500"
                            }`}
                        >
                          {stepItem.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-4 ${index < currentStepIndex
                            ? "bg-blue-500"
                            : "bg-gray-200"
                            }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <AddNewEmployeeForm
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-sm font-medium transition-all ${isFirstStep
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
                      <AiOutlinePlus />
                      Add Employee
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

export default AddEmployee;
