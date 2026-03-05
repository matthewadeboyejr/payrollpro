import React from "react";
import { Form } from "react-final-form";
import { AddExpenseCategoryFormValues } from "@/components/types/formFields";
import TextInput from "@/components/ui/TextInput";
import { useModal } from "@/context/ModalContext";
import Modal from "@/components/ui/Modal";
import { usePostExpenseCategoriesMutation } from "@/services/api/constants/expense.constant";

const AddExpenseCategory = () => {
    const { setIsModalOpen } = useModal();
    const [postExpenseCategory, { isLoading }] = usePostExpenseCategoriesMutation();

    const onSubmit = async (values: AddExpenseCategoryFormValues) => {
        try {
            await postExpenseCategory(values).unwrap();
            setIsModalOpen(null);
        } catch (error) {
            console.error("Failed to add expense category", error);
        }
    };

    const validate = (values: AddExpenseCategoryFormValues) => {
        const errors: Partial<AddExpenseCategoryFormValues> = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        return errors;
    };

    return (
        <Modal
            heading="Add Expense Category"
            onClose={() => setIsModalOpen(null)}
            formId="add-expense-category-form"
            isSubmitting={isLoading}
            submitBtnText="Add Category"
        >
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form
                        id="add-expense-category-form"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <TextInput
                            label="Name"
                            name="name"
                            placeholder="Category Name"
                            form={form}
                        />
                        <TextInput
                            label="Monthly Limit"
                            name="monthlyLimit"
                            type="number"
                            placeholder="0.00"
                            form={form}
                        />
                    </form>
                )}
            />
        </Modal>
    );
};

export default AddExpenseCategory;
