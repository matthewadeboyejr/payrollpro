import { ReviewLeaveFormValues } from "@/components/types/formFields";
import React, { useCallback, useState } from "react";
import { Form } from "react-final-form";

import { useModal } from "@/context/ModalContext";

import { showAlert } from "@/components/ui/ShowAlert";

import {
  useApproveLeaveRequestMutation,
  useRejectLeaveRequestMutation,
} from "@/services/api/constants/Leave.constant";

import ReviewLeaveForm from "../../forms/ReviewLeaveForm ";
import { LeaveDetails as LeaveDetailsType } from "../../types/Leave";
import LeaveDetails from "./LeaveDetails";
import NoBtnModal from "@/components/ui/NoBtnModal";

const ReviewLeaveRequest = ({
  initialValues,
}: {
  initialValues: LeaveDetailsType;
}) => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<any>(null);

  const requestId = initialValues?.id;
  const [rejectLeaveRequest, { isLoading: isRejectingLeave }] =
    useRejectLeaveRequestMutation();
  const [approveLeaveRequest, { isLoading: isApprovingLeave }] =
    useApproveLeaveRequestMutation();

  const handleApprove = useCallback(async () => {
    if (!requestId) {
      showAlert("Error", "Request ID is required", "error");
      return;
    }

    try {
      const response = await approveLeaveRequest({ id: requestId }).unwrap();

      if (response?.code === 200 || response?.code === 201) {
        showAlert(
          "Success",
          response?.message || "Leave request approved",
          "success"
        );
        formRef?.reset();
        setIsModalOpen(null);
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Failed to approve leave request. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setFormRef(null);
    }
  }, [requestId, approveLeaveRequest, formRef, setIsModalOpen]);

  const handleReject = useCallback(
    async (values: ReviewLeaveFormValues) => {
      if (!requestId) {
        showAlert("Error", "Request ID is required", "error");
        return;
      }

      const payload = {
        comment: values.comment || "",
      };

      try {
        const response = await rejectLeaveRequest({
          id: requestId,
          data: payload,
        }).unwrap();

        if (response?.code === 200 || response?.code === 201) {
          showAlert(
            "Success",
            response?.message || "Leave request rejected",
            "success"
          );
          formRef?.reset();
          setIsModalOpen(null);
        }
      } catch (err: any) {
        const errorMessage =
          err?.data?.message ||
          err?.message ||
          "Failed to reject leave request. Please try again.";
        showAlert("Error", errorMessage, "error");
      } finally {
        setFormRef(null);
      }
    },
    [requestId, rejectLeaveRequest, formRef, setIsModalOpen]
  );

  const validateForm = useCallback(() => {
    // No validation required - comment is optional for rejection
    return undefined;
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(null);
    setFormRef(null);
  }, [setIsModalOpen]);

  return (
    <NoBtnModal
      size={"2xl"}
      heading={"Review Leave Request"}
      desc={"Review and approve or reject this leave request"}
      onClose={handleModalClose}
    >
      <LeaveDetails initialValues={initialValues} />
      <Form<ReviewLeaveFormValues>
        onSubmit={handleReject}
        validate={validateForm}
        render={({ handleSubmit, form, submitting }) => {
          if (!formRef) {
            setFormRef(form);
          }

          return (
            <ReviewLeaveForm
              handleSubmit={handleSubmit}
              onApprove={handleApprove}
              isRejecting={isRejectingLeave}
              isApproving={isApprovingLeave}
              form={form}
              submitting={submitting}
            />
          );
        }}
      />
    </NoBtnModal>
  );
};

export default ReviewLeaveRequest;
