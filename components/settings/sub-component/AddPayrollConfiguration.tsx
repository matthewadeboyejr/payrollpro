"use client";

import React, { useState } from "react";
import { Form } from "react-final-form";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { showAlert } from "@/components/ui/ShowAlert";
import { useCreatePayrollConfigurationMutation } from "@/services/api/constants/payroll.constant";
import PayrollConfigurationForm from "@/components/forms/PayrollConfigurationForm";
import { AddPayrollConfigurationFormValues } from "@/components/types/formFields";

import { FormApi } from "final-form";

const AddPayrollConfiguration = () => {
  const { setIsModalOpen } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formRef, setFormRef] = useState<FormApi<any> | null>(null);
  const [createConfig, { isLoading }] = useCreatePayrollConfigurationMutation();

  const onSubmit = async (values: AddPayrollConfigurationFormValues) => {
    const payload = {
      ...values,
      id: 0,
      taxYearStartMonth: Number(values.taxYearStartMonth),
      taxYearStartDay: Number(values.taxYearStartDay),
      autoEnrollEarningsTriggerAnnual: Number(values.autoEnrollEarningsTriggerAnnual),
      defaultEmployeePensionRate: Number(values.defaultEmployeePensionRate),
      defaultEmployerPensionRate: Number(values.defaultEmployerPensionRate),
      effectiveFrom: new Date(values.effectiveFrom as string).toISOString(),
      isActive: true,
    };

    try {
      const response = await createConfig(payload).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", "Configuration added successfully", "success");
        setIsModalOpen(null);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      showAlert("Error", error?.data?.message || "Failed to add configuration", "error");
    }
  };

  return (
    <Modal
      size="2xl"
      heading="New Payroll Configuration"
      desc="Add a new set of payroll rules and constants"
      onClose={() => setIsModalOpen(null)}
      submitBtnText="Save Configuration"
      onSubmit={() => formRef?.submit()}
      isSubmitting={isLoading}
    >
      <Form<AddPayrollConfigurationFormValues>
        onSubmit={onSubmit}
        initialValues={{
          taxYearStartMonth: 4,
          taxYearStartDay: 6,
          defaultTaxRegion: "England",
          enableProgressiveTax: true,
          enableEmployeeNi: true,
          autoEnrollEarningsTriggerAnnual: 10000,
          defaultEmployeePensionRate: 0.05,
          defaultEmployerPensionRate: 0.03,
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

export default AddPayrollConfiguration;
