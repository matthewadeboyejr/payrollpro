import {
  EditLeaveTypeValues,
  NewLeaveFormValues,
} from "@/components/types/formFields";
import React, { useMemo, useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";

import { showAlert } from "@/components/ui/ShowAlert";
import { addLeaveRequestConstraints } from "@/components/forms/contraints/contraints";
import { validate } from "validate.js";
import NewLeaveForm from "../../forms/NewLeaveForm";
import { Employee } from "../../types/employment";
import { useCreateLeaveRequestMutation } from "@/services/api/constants/Leave.constant";
import { useRouter } from "next/navigation";

const CreateLeaveRequest = ({
  initialValues,
}: {
  initialValues: Employee | null;
}) => {
  const { setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    reset: () => void;
    submit: () => void;
  } | null>(null);
  const router = useRouter();

  const [createLeaveRequest, { isLoading: isRequestingLeave }] =
    useCreateLeaveRequestMutation();

  const employeeId = initialValues?.id;

  const normalizedInitialValues = useMemo(() => {
    if (!initialValues) return undefined;

    /* const findIdByLabel = (
    options: Array<{ value: any; label: string }> | undefined,
    label?: string | null
  ) => {
    if (!options || !label) return undefined;
    return options.find((opt) => opt.label === label)?.value;
  };

  // Format start date for <input type="date"> as YYYY-MM-DD; treat sentinel as empty
  const raw = (initialValues as any).startDate as string | undefined;
  let startDateForInput: string | undefined = undefined;
  if (raw && raw !== "0001-01-01T00:00:00") {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
      const pad = (n: number) => String(n).padStart(2, "0");
      startDateForInput = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
        d.getDate()
      )}`;
    }
  } */

    return {
      employeeNo: initialValues?.employeeNo,
      employeeName: initialValues?.fullName,
    } as Partial<EditLeaveTypeValues>;
  }, [initialValues]);

  const onSubmitLeaveRequest = async (values: NewLeaveFormValues) => {
    console.log("click leave leave");
    const payload = {
      employeeId: employeeId,
      leaveTypeId: values.leaveType,
      startDate: values.startDate
        ? new Date(values.startDate).toISOString()
        : undefined,
      endDate: values.endDate
        ? new Date(values.endDate).toISOString()
        : undefined,
      reason: values.reason,
    };

    try {
      console.log("payload ", payload);
      const response = await createLeaveRequest(payload).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "Success");
        // Reset form after successful submission
        if (formRef) {
          formRef.reset();
        }

        router.push("/dashboard/leave-management");
      }
    } catch (err: unknown) {
      const error = err as { data?: string; message?: string };
      const errorMessage =
        error?.data ||
        error?.message ||
        "Leave Request failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setIsModalOpen(null);
      setFormRef(null);
    }
  };

  const validateForm = (values: NewLeaveFormValues) => {
    return validate(values, addLeaveRequestConstraints) || undefined;
  };

  return (
    <div>
      <Modal
        size={"2xl"}
        heading={"Submit Leave Request"}
        desc={
          "Fill in the details for your leave request. Your manager will be notified for approva"
        }
        onClose={() => setIsModalOpen(null)}
        onSubmit={() => {
          if (formRef) {
            formRef.submit();
          }
        }}
        isSubmitting={isRequestingLeave}
        submitBtnText="Request Leave "
      >
        <Form<NewLeaveFormValues>
          onSubmit={onSubmitLeaveRequest}
          validate={validateForm}
          initialValues={normalizedInitialValues}
          render={({ handleSubmit, form, submitting }) => {
            // Store form reference for modal submit
            if (!formRef) {
              setFormRef(form);
            }

            return (
              <NewLeaveForm
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

export default CreateLeaveRequest;
