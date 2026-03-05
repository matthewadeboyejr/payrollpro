
import React from "react";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import AddNewIncomeForm from "@/components/forms/AddNewIncomeForm";
import { AddNewIncomeFormValues } from "@/components/types/formFields";
import { usePostIncomeMutation } from "@/services/api/constants/expense.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { validate } from "validate.js";
import { addNewIncomeConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";

const AddIncome = () => {
    const { setIsModalOpen } = useModal();
    const [createIncome, { isLoading: isCreating }] = usePostIncomeMutation();

    const onSubmit = async (values: AddNewIncomeFormValues) => {
        try {

            const payload = {
                employeeId: Number(values.employeeId) || 0,
                categoryId: Number(values.categoryId) || 0,

                amount: Number(values.amount) || 0,
                description: values.description,
                incomeDate: new Date(values.incomeDate).toISOString(),
            };
            const response = await createIncome(payload).unwrap();
            if (response?.statusCode === 201 || response?.statusCode === 200) {
                showAlert("Success", response?.message, "success");
                setIsModalOpen(null);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Operation failed:", error);
            showAlert("Error", error?.data?.message || "Failed to add income", "error");
        }
    };

    const validateForm = (values: AddNewIncomeFormValues) => {
        return validate(values, addNewIncomeConstraints) || undefined;
    };

    return (
        <Modal
            size={"2xl"}
            heading={"Add New Income"}
            desc={"Add a new income record"}
            onClose={() => setIsModalOpen(null)}
            isSubmitting={isCreating}
            submitBtnText="Add Income"
            formId="add-income-form"
        >
            <Form<AddNewIncomeFormValues>
                onSubmit={onSubmit}
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (
                    <AddNewIncomeForm
                        id="add-income-form"
                        handleSubmit={handleSubmit}
                        form={form}
                        submitting={submitting}
                    />
                )}
            />
        </Modal>
    );
};

export default AddIncome;
