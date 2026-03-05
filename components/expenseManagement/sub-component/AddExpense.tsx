import React from "react";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import AddNewExpenseForm from "@/components/forms/AddNewExpenseForm";
import { AddNewExpenseFormValues } from "@/components/types/formFields";
import { useCreateExpenseMutation } from "@/services/api/constants/expense.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { validate } from "validate.js";
import { addNewExpenseConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";

const AddExpense = () => {
    const { setIsModalOpen } = useModal();
    const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();

    const onSubmit = async (values: AddNewExpenseFormValues) => {
        try {
            const payload = {
                employeeId: Number(values.employeeId) || 0,
                categoryId: Number(values.categoryId) || 0,
                amount: Number(values.amount) || 0,
                description: values.description,
                receipt: values.receipt,
            };
            const response = await createExpense(payload).unwrap();
            if (response?.statusCode === 201 || response?.statusCode === 200) {
                showAlert("Success", response?.message, "success");
                setIsModalOpen(null);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Operation failed:", error);
            showAlert("Error", error?.data?.message || "Failed to add expense", "error");
        }
    };

    const validateForm = (values: AddNewExpenseFormValues) => {
        return validate(values, addNewExpenseConstraints) || undefined;
    };

    return (
        <Modal
            size={"2xl"}
            heading={"Add New Expense"}
            desc={"Add a new expense to the system"}
            onClose={() => setIsModalOpen(null)}
            isSubmitting={isCreating}
            submitBtnText="Add Expense"
            formId="add-expense-form"
        >
            <Form<AddNewExpenseFormValues>
                onSubmit={onSubmit}
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (
                    <AddNewExpenseForm
                        id="add-expense-form"
                        handleSubmit={handleSubmit}
                        form={form}
                        submitting={submitting}
                    />
                )}
            />
        </Modal>
    );
};

export default AddExpense;
