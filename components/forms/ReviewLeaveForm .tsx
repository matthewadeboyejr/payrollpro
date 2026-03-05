import React from "react";
import { FormProps } from "../types/formFields";
import TextareaInput from "../ui/TextareaInput";
import Spinner from "../ui/Spinner";

interface ReviewLeaveFormProps extends FormProps {
  onApprove: () => void;
  isRejecting: boolean;
  isApproving: boolean;
}

const ReviewLeaveForm = ({
  form,
  handleSubmit,
  onApprove,
  isRejecting,
  isApproving,
}: ReviewLeaveFormProps) => {
  const handleRejectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleApproveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onApprove();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex items-center gap-4">
          <TextareaInput
            label="Comments (Optional)"
            name="comment"
            placeholder="Add comments here"
            form={form}
          />
        </div>
        <div className="flex justify-end border-t border-gray-200 pt-5 dark:border-gray-700">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRejectClick}
              disabled={isRejecting || isApproving}
              className="bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-sm px-4 py-2 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 dark:bg-red-600 dark:hover:bg-red-700"
            >
              {isRejecting ? <Spinner /> : "Reject"}
            </button>

            <button
              type="button"
              onClick={handleApproveClick}
              disabled={isRejecting || isApproving}
              className="primary-btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isApproving ? <Spinner /> : "Approve"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewLeaveForm;
