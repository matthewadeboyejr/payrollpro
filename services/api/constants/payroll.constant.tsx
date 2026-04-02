import apiSlice from "../apiSlice";
import { PAYROLL } from "./constants";

export const payrollApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Payroll
    runPayroll: builder.mutation({
      query: (data) => ({
        url: `${PAYROLL}/run`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PayrollRun" as any],
    }),
    getPayrollRuns: builder.query({
      query: () => ({
        url: `${PAYROLL}/runs`,
        method: "GET",
      }),
      providesTags: ["PayrollRun" as any],
    }),
    getPayrollRunById: builder.query({
      query: (id) => ({
        url: `${PAYROLL}/runs/${id}`,
        method: "GET",
      }),
      providesTags: ["PayrollRun" as any],
    }),
    finalizePayrollRun: builder.mutation({
      query: (id) => ({
        url: `${PAYROLL}/runs/${id}/finalize`,
        method: "PUT",
      }),
      invalidatesTags: ["PayrollRun" as any],
    }),
    getEmployeePayslips: builder.query({
      query: (arg: any) => {
        const employeeId = typeof arg === "string" ? arg : arg?.employeeId;
        const year = typeof arg === "object" ? arg?.year : undefined;
        return {
          url: `${PAYROLL}/employees/${employeeId}/payslips${year ? `?year=${year}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["PayrollPayslip" as any],
    }),

    // PayrollConfiguration
    getPayrollConfiguration: builder.query({
      query: () => ({
        url: `${PAYROLL}/configuration`,
        method: "GET",
      }),
      providesTags: ["PayrollConfiguration" as any],
    }),
    createPayrollConfiguration: builder.mutation({
      query: (data) => ({
        url: `${PAYROLL}/configuration`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PayrollConfiguration" as any],
    }),
    getActivePayrollConfiguration: builder.query({
      query: () => ({
        url: `${PAYROLL}/configuration/active`,
        method: "GET",
      }),
      providesTags: ["PayrollConfiguration" as any],
    }),
    updatePayrollConfiguration: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PAYROLL}/configuration/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PayrollConfiguration" as any],
    }),
    activatePayrollConfiguration: builder.mutation({
      query: (id) => ({
        url: `${PAYROLL}/configuration/${id}/activate`,
        method: "PUT",
      }),
      invalidatesTags: ["PayrollConfiguration" as any],
    }),

    // PayrollPayslip
    generatePayslips: builder.mutation({
      query: (payrollRunId) => ({
        url: `${PAYROLL}/runs/${payrollRunId}/payslips/generate`,
        method: "POST",
      }),
      invalidatesTags: ["PayrollPayslip" as any],
    }),
    getPayslipsByRunId: builder.query({
      query: (payrollRunId) => ({
        url: `${PAYROLL}/runs/${payrollRunId}/payslips`,
        method: "GET",
      }),
      providesTags: ["PayrollPayslip" as any],
    }),
    getPayslipById: builder.query({
      query: (id) => ({
        url: `${PAYROLL}/payslips/${id}`,
        method: "GET",
      }),
      providesTags: ["PayrollPayslip" as any],
    }),
    sendPayslipById: builder.mutation({
      query: ({ id, emailOverride }) => ({
        url: `${PAYROLL}/payslips/${id}/send`,
        method: "POST",
        body: emailOverride ? { emailOverride } : {},
      }),
      invalidatesTags: ["PayrollPayslip" as any],
    }),
    sendPayslipsByRunId: builder.mutation({
      query: (payrollRunId) => ({
        url: `${PAYROLL}/runs/${payrollRunId}/payslips/send`,
        method: "POST",
      }),
    }),

    // PayrollRti
    getPayrollRti: builder.query({
      query: (payrollRunId) => ({
        url: `${PAYROLL}/runs/${payrollRunId}/rti`,
        method: "GET",
      }),
      providesTags: ["PayrollRti" as any],
    }),
    generatePayrollRti: builder.mutation({
      query: (payrollRunId) => ({
        url: `${PAYROLL}/runs/${payrollRunId}/rti`,
        method: "POST",
      }),
      invalidatesTags: ["PayrollRti" as any],
    }),
    markRtiAsSubmitted: builder.mutation({
      query: (id) => ({
        url: `${PAYROLL}/rti/${id}/mark-submitted`,
        method: "PUT",
      }),
      invalidatesTags: ["PayrollRti" as any],
    }),

    // PayrollRules - Tax
    getTaxRules: builder.query({
      query: () => ({
        url: `${PAYROLL}/rules/tax`,
        method: "GET",
      }),
      providesTags: ["PayrollRules" as any],
    }),
    createTaxRule: builder.mutation({
      query: (data) => ({
        url: `${PAYROLL}/rules/tax`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PayrollRules" as any],
    }),
    getTaxRuleById: builder.query({
      query: (id) => ({
        url: `${PAYROLL}/rules/tax/${id}`,
        method: "GET",
      }),
      providesTags: ["PayrollRules" as any],
    }),
    updateTaxRule: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PAYROLL}/rules/tax/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PayrollRules" as any],
    }),
    deleteTaxRule: builder.mutation({
      query: (id) => ({
        url: `${PAYROLL}/rules/tax/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PayrollRules" as any],
    }),

    // PayrollRules - NI
    getNiRules: builder.query({
      query: () => ({
        url: `${PAYROLL}/rules/ni`,
        method: "GET",
      }),
      providesTags: ["PayrollRules" as any],
    }),
    createNiRule: builder.mutation({
      query: (data) => ({
        url: `${PAYROLL}/rules/ni`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PayrollRules" as any],
    }),
    getNiRuleById: builder.query({
      query: (id) => ({
        url: `${PAYROLL}/rules/ni/${id}`,
        method: "GET",
      }),
      providesTags: ["PayrollRules" as any],
    }),
    updateNiRule: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PAYROLL}/rules/ni/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PayrollRules" as any],
    }),
    deleteNiRule: builder.mutation({
      query: (id) => ({
        url: `${PAYROLL}/rules/ni/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PayrollRules" as any],
    }),
  }),
});

export const {
  // Payroll
  useRunPayrollMutation,
  useGetPayrollRunsQuery,
  useGetPayrollRunByIdQuery,
  useFinalizePayrollRunMutation,
  useGetEmployeePayslipsQuery,
  // PayrollConfiguration
  useGetPayrollConfigurationQuery,
  useCreatePayrollConfigurationMutation,
  useGetActivePayrollConfigurationQuery,
  useUpdatePayrollConfigurationMutation,
  useActivatePayrollConfigurationMutation,
  // PayrollPayslip
  useGeneratePayslipsMutation,
  useGetPayslipsByRunIdQuery,
  useGetPayslipByIdQuery,
  useSendPayslipByIdMutation,
  useSendPayslipsByRunIdMutation,
  // PayrollRti
  useGetPayrollRtiQuery,
  useGeneratePayrollRtiMutation,
  useMarkRtiAsSubmittedMutation,
  // PayrollRules - Tax
  useGetTaxRulesQuery,
  useCreateTaxRuleMutation,
  useGetTaxRuleByIdQuery,
  useUpdateTaxRuleMutation,
  useDeleteTaxRuleMutation,
  // PayrollRules - NI
  useGetNiRulesQuery,
  useCreateNiRuleMutation,
  useGetNiRuleByIdQuery,
  useUpdateNiRuleMutation,
  useDeleteNiRuleMutation,
} = payrollApiSlice;
