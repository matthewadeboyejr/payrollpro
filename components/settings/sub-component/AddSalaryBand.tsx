import Modal from "@/components/ui/Modal";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { AddNewSalaryBandFormValues } from "@/components/types/formFields";
import { validate } from "validate.js";
import { addNewSalaryBandConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import AddNewSalaryBandForm from "@/components/forms/AddNewSalaryForm";
import { useAddNewSalaryBandMutation } from "@/services/api/constants/setting.constant";

interface FormRef {
  reset: () => void;
  submit: () => void;
}

const AddSalaryBand = () => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<FormRef | null>(null);

  const [addNewSalaryBand, { isLoading: isAddingSalaryBand }] =
    useAddNewSalaryBandMutation();

  const onSubmit = async (values: AddNewSalaryBandFormValues) => {
    const payload = {
      code: values.code,
      gradeLevelId: values.gradeLevelId,
      step: values.step,
      description: values.description,
      payType: values.payType,
      currency: values.currency,
      minSalary: values.minSalary,
      midPoint: values.midPoint,
      maxSalary: values.maxSalary,
      housingAllowance: values.housingAllowance,
      transportAllowance: values.transportAllowance,
      otherAllowance: values.otherAllowance,
    };
    console.log("payload", payload);

    try {
      const response = await addNewSalaryBand(payload).unwrap();
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
        "Salary band addition failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setIsModalOpen(null);
      setFormRef(null);
    }
  };

  const validateForm = (values: AddNewSalaryBandFormValues) => {
    return validate(values, addNewSalaryBandConstraints) || undefined;
  };

  return (
    <Modal
      size={"2xl"}
      heading={"New Salary Band"}
      desc={"Add a new salary band to the system"}
      onClose={() => setIsModalOpen(null)}
      submitBtnText="Add Salary Band"
      onSubmit={() => {
        if (formRef) {
          formRef.submit();
        }
      }}
      isSubmitting={isAddingSalaryBand}
    >
      <Form<AddNewSalaryBandFormValues>
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, form, submitting }) => {
          // Store form reference for modal submit
          if (!formRef) {
            setFormRef(form);
          }

          return (
            <AddNewSalaryBandForm
              handleSubmit={handleSubmit}
              form={form}
              submitting={submitting}
            />
          );
        }}
      />
    </Modal>
  );
};

export default AddSalaryBand;
