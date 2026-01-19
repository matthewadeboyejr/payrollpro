
import React, {  useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { validate } from "validate.js";

import { useCancelRotaMutation } from "@/services/api/constants/shift.constant";
import CancelRotaForm from "@/components/forms/CancelRotaForm";


const cancelRotaConstraints: any = {
  reason: {
    presence: {
      message: "Reason for Cancellation is required",
    },
  },
};

const CancelRota = ({ rotaId }: { rotaId: string }) => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
  } | null>(null);

  const [cancelRota, { isLoading: isSubmittingRota }] = useCancelRotaMutation();

  const onSubmitCancelRota = async (values: any) => {


    

    const payload = {
      reason: values.reason,
    };

    try {
      console.log("payload ", payload);
      const response = await cancelRota({ rotaData: payload, rotaId: rotaId }).unwrap();
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
        "Rota cancellation failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setIsModalOpen(null);
      setFormRef(null);
    }
  };

  const validateForm = (values: any) => {
    return validate(values, cancelRotaConstraints) || undefined;
  };

  return (
    <div>
      <Modal
        size={"2xl"}
        heading={"Cancel Rota"}
        desc={"Fill in the details to cancel the rota."}
        showCancelBtn={false}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isSubmittingRota}
        submitBtnText="Cancel Rota "
      >
        <Form<any>
          onSubmit={onSubmitCancelRota}
          validate={validateForm}
          render={({ handleSubmit, form, submitting }) => {
            // Store form reference for modal submit
            if (!formRef) {
              setFormRef(form);
            }
            return (
              <CancelRotaForm
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

export default CancelRota;
