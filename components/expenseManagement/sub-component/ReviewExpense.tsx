import React from "react";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import ReviewExpenseForm from "@/components/forms/ReviewExpenseForm";
import { ReviewExpenseFormValues } from "@/components/types/formFields";
import { useReviewExpenseMutation } from "@/services/api/constants/expense.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { validate } from "validate.js";
import { reviewExpenseConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";
import { ExpenseDetails } from "./ExpenseDetails";

interface ReviewExpenseProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any; // Ideally typed as Expense
}

const ReviewExpense = ({ data }: ReviewExpenseProps) => {
    const { setIsModalOpen } = useModal();
    const [reviewExpense, { isLoading: isReviewing }] = useReviewExpenseMutation();

    const onSubmit = async (values: ReviewExpenseFormValues) => {
        try {
            const payload = {
                //approverEmployeeId: user?.id,
                status: Number(values.status),
                comment: values.comment
            };
            const response = await reviewExpense({ payload, expenseId: data.id }).unwrap();

            if (response?.statusCode === 201 || response?.statusCode === 200) {
                showAlert("Success", response?.message, "success");
                setIsModalOpen(null);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Operation failed:", error);
            showAlert("Error", error?.data?.message || "Failed to review expense", "error");
        }
    };

    const validateReviewForm = (values: ReviewExpenseFormValues) => {
        return validate(values, reviewExpenseConstraints) || undefined;
    };

    return (
        <Modal
            size={"2xl"}
            heading={"Review Expense"}
            onClose={() => setIsModalOpen(null)}
            //secondaryBtnText="Reject" // Note: This logic was specialized in the original, might need adjusting if 'Reject' button does something specific other than close or form submit
            secondaryBtnColor="bg-red-500 hover:bg-red-600"
            submitBtnText="Submit Review"
            secondaryButtonAction={() => {
                setIsModalOpen(null);
            }}
            isSubmitting={isReviewing}
            formId="review-expense-form"
            onSubmit={() => onSubmit}

        >
            <ExpenseDetails
                title={data.description || "No Description"}
                employee={data.employeeName || "Unknown"}
                category={data.categoryName}
                amount={`£${data.amount}`}
                date={new Date(data.createdAt).toLocaleDateString()}
                employeeId={data.employeeId}
                receipt={data.receipt || "N/A"}
            />
            <Form<ReviewExpenseFormValues>
                onSubmit={onSubmit}
                validate={validateReviewForm}
                render={({ handleSubmit, form, submitting }) => (
                    <ReviewExpenseForm
                        id="review-expense-form"
                        handleSubmit={handleSubmit}
                        form={form}
                        submitting={submitting}
                    />
                )}
            />
        </Modal>
    );
};

export default ReviewExpense;
