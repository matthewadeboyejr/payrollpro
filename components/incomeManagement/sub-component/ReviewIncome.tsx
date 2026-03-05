
import React from "react";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import ReviewExpenseForm from "@/components/forms/ReviewExpenseForm";
import { ReviewExpenseFormValues } from "@/components/types/formFields";
import { useReviewIncomeMutation } from "@/services/api/constants/expense.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { validate } from "validate.js";
import { reviewExpenseConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";
import { useSelector } from "react-redux";
import { userData } from "@/redux/slice/user.slice";
import { ExpenseDetails } from "../../expenseManagement/sub-component/ExpenseDetails";

interface ReviewIncomeProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const ReviewIncome = ({ data }: ReviewIncomeProps) => {
    const { setIsModalOpen } = useModal();
    const [reviewIncome, { isLoading: isReviewing }] = useReviewIncomeMutation();
    const user = useSelector(userData);

    const onSubmit = async (values: ReviewExpenseFormValues) => {
        try {
            const payload = {
                approverEmployeeId: user?.id,
                status: values.status,
                comment: values.comment
            };
            const response = await reviewIncome({ payload, incomeId: data.id }).unwrap();

            if (response?.statusCode === 201 || response?.statusCode === 200) {
                showAlert("Success", response?.message, "success");
                setIsModalOpen(null);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Operation failed:", error);
            showAlert("Error", error?.data?.message || "Failed to review income", "error");
        }
    };

    const validateReviewForm = (values: ReviewExpenseFormValues) => {
        return validate(values, reviewExpenseConstraints) || undefined;
    };

    return (
        <Modal
            size={"2xl"}
            heading={"Review Income"}
            onClose={() => setIsModalOpen(null)}
            secondaryBtnText="Reject"
            secondaryBtnColor="bg-red-500 hover:bg-red-600"
            submitBtnText="Approve"
            secondaryButtonAction={() => {
                setIsModalOpen(null);
            }}
            isSubmitting={isReviewing}
            formId="review-income-form"
        >
            <ExpenseDetails
                title={data.description || "No Description"}
                employee={data.employeeName || "Unknown"}
                category={data.categoryName}
                amount={`£${data.amount}`}
                date={new Date(data.incomeDate).toLocaleDateString()}
                employeeId={data.employeeId}
                receipt={data.receipt || "N/A"}
            />
            <Form<ReviewExpenseFormValues>
                onSubmit={onSubmit}
                validate={validateReviewForm}
                render={({ handleSubmit, form, submitting }) => (
                    <ReviewExpenseForm
                        id="review-income-form"
                        handleSubmit={handleSubmit}
                        form={form}
                        submitting={submitting}
                    />
                )}
            />
        </Modal>
    );
};

export default ReviewIncome;
