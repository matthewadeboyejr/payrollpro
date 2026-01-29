import { NewShiftFormValues } from "@/components/types/formFields";
import React, { useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { addShiftConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";

import NewShiftForm from "@/components/forms/NewShiftForm";
import { useEditShiftMutation } from "@/services/api/constants/shift.constant";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditShift = ({ initialValues, shiftId }: { initialValues: any, shiftId: string }) => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
  } | null>(null);

  const [editShift, { isLoading: isSubmittingShift }] =
    useEditShiftMutation();

  const onSubmitShift = async (values: NewShiftFormValues) => {

    // Convert time format from "HH:mm" to "HH:mm:ss" for .NET TimeSpan
    const formatTimeForTimeSpan = (time: string): string => {
      if (!time) return "";
      if (time.split(":").length === 3) return time;
      return `${time}:00`;
    };

    const fullPayload = {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = Object.keys(fullPayload).reduce((acc: any, key) => {
      const k = key as keyof typeof fullPayload;
      if (fullPayload[k] !== initialValues[k]) {
        acc[k] = fullPayload[k];
      }
      return acc;
    }, {});

    if (Object.keys(payload).length === 0) {
      showAlert("Info", "No changes made", "info");
      setIsModalOpen(null);
      return;
    }

    try {
      console.log("payload ", payload);
      const response = await editShift({ payload, shiftId }).unwrap();
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
        "Shift update failed. Please try again.";
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
        heading={"Edit Shift"}
        desc={"Update the details of the shift."}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isSubmittingShift}
        submitBtnText="Update Shift"
      >
        <Form<NewShiftFormValues>
          onSubmit={onSubmitShift}
          validate={validateForm}
          initialValues={initialValues}
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

export default EditShift;
