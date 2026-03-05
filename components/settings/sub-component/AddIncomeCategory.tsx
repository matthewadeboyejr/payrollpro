import React from "react";
import { Form } from "react-final-form";
import { AddIncomeCategoryFormValues } from "@/components/types/formFields";
import TextInput from "@/components/ui/TextInput";
import { useModal } from "@/context/ModalContext";
import Modal from "@/components/ui/Modal";
import { usePostIncomeCategoriesMutation } from "@/services/api/constants/expense.constant";

const AddIncomeCategory = () => {
    const { setIsModalOpen } = useModal();
    const [postIncomeCategory, { isLoading }] = usePostIncomeCategoriesMutation();

    const onSubmit = async (values: AddIncomeCategoryFormValues) => {
        try {
            await postIncomeCategory(values).unwrap();
            setIsModalOpen(null);
        } catch (error) {
            console.error("Failed to add income category", error);
        }
    };

    const validate = (values: AddIncomeCategoryFormValues) => {
        const errors: Partial<AddIncomeCategoryFormValues> = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        return errors;
    };

    return (
        <Modal
            heading="Add Income Category"
            onClose={() => setIsModalOpen(null)}
            formId="add-income-category-form"
            isSubmitting={isLoading}
            submitBtnText="Add Category"
        >
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form
                        id="add-income-category-form"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <TextInput
                            label="Name"
                            name="name"
                            placeholder="Category Name"
                            form={form}
                        />
                        <div className="flex items-center gap-2">
                            <label htmlFor="isTaxable" className="text-sm font-medium text-gray-700">
                                Is Taxable
                            </label>
                            <input
                                id="isTaxable"
                                name="isTaxable"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                onChange={(e) => form.change("isTaxable", e.target.checked)}
                            />
                        </div>
                    </form>
                )}
            />
        </Modal>
    );
};

export default AddIncomeCategory;
