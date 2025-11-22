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

interface FormRef {
  reset: () => void;
  submit: () => void;
}

const AddEmployee = () => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<FormRef | null>(null);

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
    };

    try {
      const response = await addNewEmployee(payload).unwrap();
      console.log("response", response);
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "success");
        // Reset form after successful submission
        if (formRef) {
          formRef.reset();
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
        heading={"Add New Employee"}
        desc={"Add a new employee to the system"}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
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
              <AddNewEmployeeForm
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

export default AddEmployee;
