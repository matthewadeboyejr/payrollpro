import { NewShiftFormValues } from "@/components/types/formFields";
import React, { useMemo, useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { addShiftConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";

import NewShiftForm from "@/components/forms/NewShiftForm";
import { useCreateShiftMutation } from "@/services/api/constants/shift.constant";

const AddShift = () => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
  } | null>(null);

  const [createShift, { isLoading: isSubmittingShift }] =
    useCreateShiftMutation();

  const onSubmitShift = async (values: NewShiftFormValues) => {
    console.log("click shift shift");

    // Convert time format from "HH:mm" to "HH:mm:ss" for .NET TimeSpan
    const formatTimeForTimeSpan = (time: string): string => {
      if (!time) return "";
      if (time.split(":").length === 3) return time;
      return `${time}:00`;
    };

    const payload = {
      name: values.name,
      departmentId: values.departmentId,
      ratePerHour: values.ratePerHour,
      startTime: formatTimeForTimeSpan(values.startTime),
      endTime: formatTimeForTimeSpan(values.endTime),
      isOvernight: values.isOvernight,
      description: values.description,
      address: values.address,
      emergencyContactName: values.emergencyContactName,
      emergencyContactPhone: values.emergencyContactPhone,
    };

    try {
      console.log("payload ", payload);
      const response = await createShift(payload).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "Success");
        // Reset form after successful submission
        if (formRef) {
          formRef.reset();
        }
        setIsModalOpen(null);
      }
    } catch (err: unknown) {
      console.log("error", err);
      const error = err as {
        data?: { code?: number; title?: string; message?: string | string[] };
      };

      // Handle message as string or string array
      const message = error?.data?.message;
      const messageText = Array.isArray(message) ? message.join(", ") : message;

      const errorMessage =
        error?.data?.title ||
        messageText ||
        "Shift submission failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setIsModalOpen(null);
      setFormRef(null);
    }
  };

  const validateForm = (values: NewShiftFormValues) => {
    return validate(values, addShiftConstraints) || undefined;
  };

  return (
    <div>
      <Modal
        size={"2xl"}
        heading={"New Shift"}
        desc={"Fill in the details to submit a new shift."}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isSubmittingShift}
        submitBtnText="Submit Shift "
      >
        <Form<NewShiftFormValues>
          onSubmit={onSubmitShift}
          validate={validateForm}
          render={({ handleSubmit, form, submitting }) => {
            // Store form reference for modal submit
            if (!formRef) {
              setFormRef(form);
            }
            return (
              <NewShiftForm
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

export default AddShift;
