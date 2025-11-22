import Modal from "@/components/ui/Modal";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { AddNewUserFormValues } from "@/components/types/formFields";
import { validate } from "validate.js";
import { addNewUserConstraints } from "@/components/forms/contraints/contraints";
import AddNewUserForm from "@/components/forms/AddNewUserForm";
import { useModal } from "@/context/ModalContext";
import { useAddNewUserMutation } from "@/services/api/constants/auth.constant";
import { showAlert } from "@/components/ui/ShowAlert";

const AddUser = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<any>(null);

  const [addNewUser, { isLoading: isAddingUser }] = useAddNewUserMutation();

  const onSubmit = async (values: AddNewUserFormValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      roleId: 0,
    };

    try {
      const response = await addNewUser(payload).unwrap();
      console.log("response", response);
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "success");
        // Reset form after successful submission
        if (formRef) {
          formRef.reset();
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.data || err?.message || "User addition failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    } finally {
      setIsModalOpen(null);
      setFormRef(null);
    }
  };

  const validateForm = (values: AddNewUserFormValues) => {
    return validate(values, addNewUserConstraints) || undefined;
  };

  return (
    <Modal
      size={"2xl"}
      heading={"Add New User"}
      desc={"Add a new user to the system"}
      onClose={() => setIsModalOpen(null)}
      submitBtnText="Add User"
      onSubmit={() => {
        if (formRef) {
          formRef.submit();
        }
      }}
      isSubmitting={isAddingUser}
    >
      <Form<AddNewUserFormValues>
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, form, submitting, values }) => {
          // Store form reference for modal submit
          if (!formRef) {
            setFormRef(form);
          }

          return (
            <AddNewUserForm
              handleSubmit={handleSubmit}
              form={form}
              submitting={submitting}
            />
          );
        }}
      />
    </Modal>
  );
};

export default AddUser;
