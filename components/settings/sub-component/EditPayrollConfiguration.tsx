"use client";

import React, { useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { useUpdatePayrollConfigurationMutation } from "@/services/api/constants/payroll.constant";
import PayrollConfigurationForm from "@/components/forms/PayrollConfigurationForm";
import { PayrollConfiguration } from "@/components/types/formFields";
import { FormApi } from "final-form";

interface Props {
  initialValues: PayrollConfiguration;
}

const EditPayrollConfiguration = ({ initialValues }: Props) => {
  const { setIsModalOpen } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formRef, setFormRef] = useState<FormApi<any> | null>(null);
  const [updateConfig, { isLoading }] = useUpdatePayrollConfigurationMutation();

  const onSubmit = async (values: Record<string, unknown>) => {
    const data = {
      ...values,
      taxYearStartMonth: Number(values.taxYearStartMonth),
      taxYearStartDay: Number(values.taxYearStartDay),
      autoEnrollEarningsTriggerAnnual: Number(values.autoEnrollEarningsTriggerAnnual),
      defaultEmployeePensionRate: Number(values.defaultEmployeePensionRate),
      defaultEmployerPensionRate: Number(values.defaultEmployerPensionRate),
      effectiveFrom: new Date(values.effectiveFrom as string).toISOString(),
    };

    try {
      const response = await updateConfig({ id: initialValues.id, data }).unwrap();
      if (response?.code === 200) {
        showAlert("Success", "Configuration updated successfully", "success");
        setIsModalOpen(null);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      showAlert("Error", error?.data?.message || "Failed to update configuration", "error");
    }
  };

  return (
    <Modal
      size="2xl"
      heading="Edit Payroll Configuration"
      desc="Update payroll rules and constants"
      onClose={() => setIsModalOpen(null)}
      submitBtnText="Save Changes"
      onSubmit={() => formRef?.submit()}
      isSubmitting={isLoading}
    >
      <Form
        onSubmit={onSubmit}
        initialValues={{
          ...initialValues,
          effectiveFrom: initialValues.effectiveFrom.split('T')[0], // format for date input
        }}
        render={({ handleSubmit, form, submitting }) => {
          if (!formRef) setFormRef(form);
          return (
            <PayrollConfigurationForm
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

export default EditPayrollConfiguration;
