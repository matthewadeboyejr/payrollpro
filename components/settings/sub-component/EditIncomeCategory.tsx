import React from "react";
import { Form } from "react-final-form";
import { EditIncomeCategoryFormValues } from "@/components/types/formFields";
import TextInput from "@/components/ui/TextInput";
import { useModal } from "@/context/ModalContext";
import Modal from "@/components/ui/Modal";
import { useEditIncomeCategoriesMutation } from "@/services/api/constants/expense.constant";

interface EditIncomeCategoryProps {
    initialValues: EditIncomeCategoryFormValues;
}

const EditIncomeCategory: React.FC<EditIncomeCategoryProps> = ({
    initialValues,
}) => {
    const { setIsModalOpen } = useModal();
    const [editIncomeCategory, { isLoading }] = useEditIncomeCategoriesMutation();

    const onSubmit = async (values: EditIncomeCategoryFormValues) => {
        try {
            await editIncomeCategory({
                payload: values,
                incomeCategoryId: values.id,
            }).unwrap();
            setIsModalOpen(null);
        } catch (error) {
            console.error("Failed to update income category", error);
        }
    };

    const validate = (values: EditIncomeCategoryFormValues) => {
        const errors: Partial<EditIncomeCategoryFormValues> = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        return errors;
    };

    return (
        <Modal
            heading="Edit Income Category"
            onClose={() => setIsModalOpen(null)}
            formId="edit-income-category-form"
            isSubmitting={isLoading}
            submitBtnText="Update Category"
        >
            <Form
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form
                        id="edit-income-category-form"
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
                                defaultChecked={initialValues.isTaxable}
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

export default EditIncomeCategory;
