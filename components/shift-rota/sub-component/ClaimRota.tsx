import { ClaimRotaFormValues } from "@/components/types/formFields";
import React, { useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { claimRotaConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";

import { useClaimRotaMutation } from "@/services/api/constants/shift.constant";
import ClaimRotaForm from "@/components/forms/ClaimRotaForm";

const ClaimRota = ({ rotaId }: { rotaId: string }) => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
  } | null>(null);

  const [claimRota, { isLoading: isLoadingClaimRota }] = useClaimRotaMutation();

  const onSubmitRota = async (values: ClaimRotaFormValues) => {
    const payload = {
      rotaId: rotaId,
      employeeId: values.employeeId,
    };

    try {
      const response = await claimRota(payload).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "Success");
        if (formRef) {
          formRef.reset();
        }
        setIsModalOpen(null);
      }
    } catch (err: unknown) {
      const error = err as {
        data?: { code?: number; title?: string; message?: string | string[] };
      };
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

  const validateForm = (values: ClaimRotaFormValues) => {
    return validate(values, claimRotaConstraints) || undefined;
  };

  return (
    <div>
      <Modal
        size={"2xl"}
        heading={"Claim Rota"}
        desc={"Fill in the details to claim this rota."}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isLoadingClaimRota}
        submitBtnText="Claim Rota"
      >
        <Form<ClaimRotaFormValues>
          onSubmit={onSubmitRota}
          validate={validateForm}
          render={({ handleSubmit, form, submitting }) => {
            if (!formRef) {
              setFormRef(form);
            }
            return (
              <ClaimRotaForm
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

export default ClaimRota;
