import { NewRotaFormValues } from "@/components/types/formFields";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { addRotaConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";
import NewRotaForm from "@/components/forms/NewRotaForm";
import {
  useEditRotaMutation,
  useGetRotaByIdQuery,
} from "@/services/api/constants/shift.constant";
import ViewSkeleton from "@/components/ui/ViewSkeleton";

interface EditRotaProps {
  rotaId: string;
}

const EditRota = ({ rotaId }: EditRotaProps) => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
    initialize: (
      values:
        | Partial<NewRotaFormValues>
        | ((values: NewRotaFormValues) => Partial<NewRotaFormValues>)
    ) => void;
  } | null>(null);

  const { data: rotaData, isLoading: isLoadingRotaData } = useGetRotaByIdQuery(
    rotaId,
    { skip: !rotaId }
  );

  const [editRota, { isLoading: isSubmittingRota }] = useEditRotaMutation();

  const rotaDetails = rotaData?.data;

  // Normalize initial values for the form
  const normalizedInitialValues = useMemo(() => {
    if (!rotaDetails) return undefined;

    // Format workDate from ISO string to YYYY-MM-DD for date input
    let workDateForInput: string | undefined = undefined;
    if (rotaDetails.workDate) {
      const date = new Date(rotaDetails.workDate);
      if (!isNaN(date.getTime())) {
        const pad = (n: number) => String(n).padStart(2, "0");
        workDateForInput = `${date.getFullYear()}-${pad(
          date.getMonth() + 1
        )}-${pad(date.getDate())}`;
      }
    }

    return {
      workDate: workDateForInput,
      employeeId: rotaDetails.employeeId
        ? String(rotaDetails.employeeId)
        : undefined,
      shiftId: rotaDetails.shiftId ? String(rotaDetails.shiftId) : undefined,
    } as Partial<NewRotaFormValues>;
  }, [rotaDetails]);

  // Initialize form when modal opens and rota data is available
  useEffect(() => {
    if (formRef && normalizedInitialValues) {
      formRef.initialize(normalizedInitialValues);
    }
  }, [formRef, normalizedInitialValues]);

  const onSubmitRota = async (values: NewRotaFormValues) => {
    // Convert date from "YYYY-MM-DD" to ISO format "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formatDateToISO = (dateString: string): string => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString();
    };

    const rotaIdValue = rotaDetails?.id;
    if (!rotaIdValue) {
      showAlert("Error", "Rota ID is missing", "error");
      return;
    }

    const payload = {
      workDate: values.workDate ? formatDateToISO(values.workDate) : undefined,
      employeeId: values.employeeId ? Number(values.employeeId) : undefined,
      shiftId: values.shiftId ? Number(values.shiftId) : undefined,
    };

    try {
      const response = await editRota({ payload, rotaId: rotaIdValue.toString() }).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "Success");
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
        "Failed to update rota. Please try again.";
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
        heading={"Edit Rota"}
        desc={"Update the rota details."}
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isSubmittingRota}
        submitBtnText="Update Rota"
      >
        {isLoadingRotaData ? (
          <ViewSkeleton />
        ) : (
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
        )}
      </Modal>
    </div>
  );
};

export default EditRota;
