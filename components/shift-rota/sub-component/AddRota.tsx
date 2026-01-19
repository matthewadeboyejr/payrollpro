import { NewRotaFormValues } from "@/components/types/formFields";
import React, { useMemo, useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { addRotaConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";
import NewRotaForm from "@/components/forms/NewRotaForm";
import { useCreateRotaMutation } from "@/services/api/constants/shift.constant";

const AddRota = () => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
  } | null>(null);

  const [createRota, { isLoading: isSubmittingRota }] = useCreateRotaMutation();

  const onSubmitRota = async (values: NewRotaFormValues) => {
    console.log("click rota rota");

    // Convert date from "YYYY-MM-DD" to ISO format "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formatDateToISO = (dateString: string): string => {
      if (!dateString) return "";
      // Create a date object from the date string (assumes local time)
      const date = new Date(dateString);
      // Convert to ISO string
      return date.toISOString();
    };

    const payload = {
      workDate: values.workDate ? formatDateToISO(values.workDate) : undefined,
      employeeId: values.employeeId,
      shiftId: values.shiftId,
    };

    try {
      console.log("payload ", payload);
      const response = await createRota(payload).unwrap();
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
        "Rota submission failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setIsModalOpen(null);
      setFormRef(null);
    }
  };

  const validateForm = (values: NewRotaFormValues) => {
    return validate(values, addRotaConstraints) || undefined;
  };

  return (
    <div>
      <Modal
        size={"2xl"}
        heading={"New Rota"}
        desc={"Fill in the details to submit a new rota."}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isSubmittingRota}
        submitBtnText="Submit Rota "
      >
        <Form<NewRotaFormValues>
          onSubmit={onSubmitRota}
          validate={validateForm}
          render={({ handleSubmit, form, submitting }) => {
            // Store form reference for modal submit
            if (!formRef) {
              setFormRef(form);
            }
            return (
              <NewRotaForm
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

export default AddRota;
