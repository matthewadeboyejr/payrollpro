import Modal from "@/components/ui/Modal";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Form } from "react-final-form";
import { EditUserFormValues } from "@/components/types/formFields";
import { validate } from "validate.js";
import { editUserConstraints } from "@/components/forms/contraints/contraints";
import { useModal } from "@/context/ModalContext";
import { useUpdateUserMutation } from "@/services/api/constants/auth.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import EditUserForm from "@/components/forms/EditUserForm";
import useConstantData from "@/hooks/useConstantData";

type RoleOption = { value: string; label: string };

interface Role {
  id?: string;
  name?: string;
}

const mapRolesToIds = (
  roles: (Role | string)[],
  roleOptions?: RoleOption[]
): string[] => {
  if (!Array.isArray(roles)) return [];

  return roles
    .map((role) => {
      if (typeof role === "object" && role?.id) {
        return role.id;
      }
      if (typeof role === "string" && roleOptions) {
        return roleOptions.find((opt) => opt.label === role)?.value || null;
      }
      return null;
    })
    .filter((id): id is string => id !== null);
};

const normalizeFormValues = (values: EditUserFormValues) => ({
  firstName: values.firstName || "",
  lastName: values.lastName || "",
  email: values.email || "",
  phoneNumber: values.phoneNumber || "",
  status: values.status || "",
  roleIds: Array.isArray(values.roleIds) ? values.roleIds : [],
});

const arraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sorted1.every((val, idx) => val === sorted2[idx]);
};

const EditUser = ({
  initialValues,
}: {
  initialValues: EditUserFormValues | null;
}) => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [formRef, setFormRef] = useState<{
    submit: () => void;
    reset: () => void;
    initialize: (
      values:
        | Partial<EditUserFormValues>
        | ((values: EditUserFormValues) => Partial<EditUserFormValues>)
    ) => void;
  } | null>(null);
  const { roleOptions } = useConstantData();
  const [editUser, { isLoading: isEditingUser }] = useUpdateUserMutation();

  // Store normalized original values for comparison
  const originalValues = useMemo(() => {
    if (!initialValues) return null;

    const roleIds =
      initialValues.roleIds && Array.isArray(initialValues.roleIds)
        ? [...initialValues.roleIds]
        : mapRolesToIds(initialValues.roles || [], roleOptions);

    return normalizeFormValues({
      ...initialValues,
      roleIds,
    });
  }, [initialValues, roleOptions]);

  // Initialize form when initialValues change or when modal opens
  useEffect(() => {
    if (formRef && originalValues && isModalOpen) {
      formRef.initialize(originalValues);
    }
  }, [originalValues, formRef, isModalOpen]);

  const buildChangedPayload = useCallback(
    (
      values: EditUserFormValues,
      original: NonNullable<typeof originalValues>
    ): Partial<EditUserFormValues> => {
      const payload: Partial<EditUserFormValues> = {};

      if (values.firstName !== original.firstName) {
        payload.firstName = values.firstName;
      }
      if (values.lastName !== original.lastName) {
        payload.lastName = values.lastName;
      }
      if (values.email !== original.email) {
        payload.email = values.email;
      }
      if (values.phoneNumber !== original.phoneNumber) {
        payload.phoneNumber = values.phoneNumber;
      }
      if (values.status !== original.status) {
        payload.status = values.status;
      }
      const currentRoleIds = Array.isArray(values.roleIds)
        ? values.roleIds
        : [];
      const originalRoleIds = Array.isArray(original.roleIds)
        ? original.roleIds
        : [];

      if (!arraysEqual(currentRoleIds, originalRoleIds)) {
        payload.roleIds = currentRoleIds;
      }

      return payload;
    },
    []
  );

  const onSubmit = useCallback(
    async (values: EditUserFormValues) => {
      if (!initialValues?.id) {
        showAlert("Error", "User ID is required", "error");
        return;
      }

      if (!originalValues) {
        showAlert("Error", "Initial values are required", "error");
        return;
      }

      const payload = buildChangedPayload(values, originalValues);

      if (Object.keys(payload).length === 0) {
        showAlert("Info", "No changes detected", "info");
        return;
      }

      try {
        const response = await editUser({
          userId: initialValues.id,
          data: payload,
        }).unwrap();

        if (response?.code === 200 || response?.code === 201) {
          showAlert(
            "Success",
            response.message || "User updated successfully",
            "success"
          );
          formRef?.reset();
        }
      } catch (err: unknown) {
        const error = err as { data?: { message?: string }; message?: string };
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "User editing failed. Please try again.";
        showAlert("Error", errorMessage, "error");
      } finally {
        setIsModalOpen(null);
        setFormRef(null);
      }
    },
    [
      initialValues,
      originalValues,
      editUser,
      formRef,
      buildChangedPayload,
      setIsModalOpen,
    ]
  );

  const validateForm = useCallback((values: EditUserFormValues) => {
    return validate(values, editUserConstraints) || undefined;
  }, []);

  const handleModalSubmit = useCallback(() => {
    formRef?.submit();
  }, [formRef]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(null);
  }, [setIsModalOpen]);

  return (
    <Modal
      size={"2xl"}
      heading={"Edit User"}
      desc={"Edit a user to the system"}
      onClose={handleModalClose}
      submitBtnText="Edit User"
      onSubmit={handleModalSubmit}
      isSubmitting={isEditingUser}
    >
      <Form<EditUserFormValues>
        onSubmit={onSubmit}
        validate={validateForm}
        initialValues={originalValues || undefined}
        render={({ handleSubmit, form }) => {
          if (!formRef) {
            setFormRef(form);
          }

          return (
            <EditUserForm
              handleSubmit={handleSubmit}
              form={form}
              submitting={isEditingUser}
            />
          );
        }}
      />
    </Modal>
  );
};

export default EditUser;
