
import React from "react";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import AddNewIncomeForm from "@/components/forms/AddNewIncomeForm";
import { AddNewIncomeFormValues } from "@/components/types/formFields";
import { useEditIncomeMutation } from "@/services/api/constants/expense.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { validate } from "validate.js";
import { addNewIncomeConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";

interface EditIncomeProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValues: any; // Using any for now, to be refined later
}

const EditIncome = ({ initialValues }: EditIncomeProps) => {
    const { setIsModalOpen } = useModal();
    const [editIncome, { isLoading: isUpdating }] = useEditIncomeMutation();

    const onSubmit = async (values: AddNewIncomeFormValues) => {
        try {
            const formValues = values as AddNewIncomeFormValues;

            const payload = {
                employeeId: Number(formValues.employeeId) || 0,
                categoryId: Number(formValues.categoryId) || 0,

                amount: Number(formValues.amount) || 0,
                description: formValues.description,
                incomeDate: new Date(formValues.incomeDate).toISOString(),
            };

            const response = await editIncome({ payload, incomeId: initialValues.id }).unwrap();

            if (response?.statusCode === 201 || response?.statusCode === 200) {
                showAlert("Success", response?.message, "success");
                setIsModalOpen(null);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Operation failed:", error);
            showAlert("Error", error?.data?.message || "Failed to update income", "error");
        }
    };

    const validateForm = (values: AddNewIncomeFormValues) => {
        return validate(values, addNewIncomeConstraints) || undefined;
    };

    return (
        <Modal
            size={"2xl"}
            heading={"Edit Income"}
            desc={"Edit income record"}
            onClose={() => setIsModalOpen(null)}
            submitBtnText="Save Changes"
            formId="edit-income-form"
            isSubmitting={isUpdating}
        >
            <Form<AddNewIncomeFormValues>
                initialValues={initialValues || {}}
                onSubmit={onSubmit}
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (

                    <AddNewIncomeForm
                        id="edit-income-form"
                        handleSubmit={handleSubmit}
                        form={form}
                        submitting={submitting}
                    />
                )}
            />
        </Modal>
    );
};

export default EditIncome;
