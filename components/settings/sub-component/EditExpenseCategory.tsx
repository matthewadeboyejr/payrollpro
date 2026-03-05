import React from "react";
import { Form } from "react-final-form";
import { EditExpenseCategoryFormValues } from "@/components/types/formFields";
import TextInput from "@/components/ui/TextInput";
import { useModal } from "@/context/ModalContext";
import Modal from "@/components/ui/Modal";
import { useEditExpenseCategoriesMutation } from "@/services/api/constants/expense.constant";

interface EditExpenseCategoryProps {
    initialValues: EditExpenseCategoryFormValues;
}

const EditExpenseCategory: React.FC<EditExpenseCategoryProps> = ({
    initialValues,
}) => {
    const { setIsModalOpen } = useModal();
    const [editExpenseCategory, { isLoading }] = useEditExpenseCategoriesMutation();

    const onSubmit = async (values: EditExpenseCategoryFormValues) => {
        try {
            await editExpenseCategory({
                payload: values,
                expenseCategoryId: values.id,
            }).unwrap();
            setIsModalOpen(null);
        } catch (error) {
            console.error("Failed to update expense category", error);
        }
    };

    const validate = (values: EditExpenseCategoryFormValues) => {
        const errors: Partial<EditExpenseCategoryFormValues> = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        return errors;
    };

    return (
        <Modal
            heading="Edit Expense Category"
            onClose={() => setIsModalOpen(null)}
            formId="edit-expense-category-form"
            isSubmitting={isLoading}
            submitBtnText="Update Category"
        >
            <Form
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form
                        id="edit-expense-category-form"
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

export default EditExpenseCategory;
