import React from "react";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import AddNewExpenseForm from "@/components/forms/AddNewExpenseForm";
import { AddNewExpenseFormValues } from "@/components/types/formFields";
import { useEditExpenseMutation } from "@/services/api/constants/expense.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { validate } from "validate.js";
import { addNewExpenseConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";

interface EditExpenseProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValues: any; // Using any to match the flexibility, but should ideally be typed
}

const EditExpense = ({ initialValues }: EditExpenseProps) => {
    const { setIsModalOpen } = useModal();
    const [editExpense, { isLoading: isUpdating }] = useEditExpenseMutation();

    const onSubmit = async (values: AddNewExpenseFormValues) => {
        try {
            const formValues = values as AddNewExpenseFormValues;
            const payload = {
                employeeId: Number(formValues.employeeId) || 0,
                categoryId: Number(formValues.categoryId) || 0,
                amount: Number(formValues.amount) || 0,
                description: formValues.description,
                receipt: formValues.receipt,
            };
            // Assuming initialValues has an ID
            const response = await editExpense({ payload, expenseId: initialValues.id }).unwrap();

            if (response?.statusCode === 201 || response?.statusCode === 200) {
                showAlert("Success", response?.message, "success");
                setIsModalOpen(null);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Operation failed:", error);
            showAlert("Error", error?.data?.message || "Failed to update expense", "error");
        }
    };

    const validateForm = (values: AddNewExpenseFormValues) => {
        return validate(values, addNewExpenseConstraints) || undefined;
    };

    return (
        <Modal
            size={"2xl"}
            heading={"Edit Expense"}
            desc={"Edit the expense"}
            onClose={() => setIsModalOpen(null)}
            submitBtnText="Edit Expense"
            formId="edit-expense-form"
            isSubmitting={isUpdating}
        >
            <Form<AddNewExpenseFormValues>
                initialValues={initialValues || {}}
                onSubmit={onSubmit}
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (
                    <AddNewExpenseForm
                        id="edit-expense-form"
                        handleSubmit={handleSubmit}
                        form={form}
                        submitting={submitting}
                    />
                )}
            />
        </Modal>
    );
};

export default EditExpense;
