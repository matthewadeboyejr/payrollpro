import apiSlice from "../apiSlice";
import { ACCOUNTING, ACCOUNTING_EXPENSES, AUDIT_LOGS, BANK_ACCOUNTS, BANK_TRANSACTIONS, BILLS, CUSTOMERS, INVOICES, JOURNALS, PAYMENTS, PERIODS, RECONCILIATIONS, RECURRING_TEMPLATES, REPORTS, SUPPLIERS, VAT } from "./constants";

export const accountingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // accountingAccounts
    accountingAccounts: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNTING}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Accounting" as any],
    }),
    getAccountingAccounts: builder.query({
      query: () => ({
        url: `${ACCOUNTING}`,
        method: "GET",
      }),
      providesTags: ["Accounting" as any],
    }),
    getAccountingAccountById: builder.query({
      query: (id) => ({
        url: `${ACCOUNTING}/${id}`,
        method: "GET",
      }),
      providesTags: ["Accounting" as any],
    }),
    updateAccountingAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ACCOUNTING}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Accounting" as any],
    }),
    deleteAccountingAccount: builder.mutation({
      query: (id) => ({
        url: `${ACCOUNTING}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Accounting" as any],
    }),
    //accountingAuditLogs
    accountingAuditLogs: builder.query({
      query: (filters: { entityName: string; action: string }) => ({
        url: `${AUDIT_LOGS}/?entityName=${filters.entityName}&action=${filters.action}`,
        method: "GET",

      }),
      providesTags: ["AuditLogs" as any],
    }),

    //accountingBankAccounts
    accountingBankAccounts: builder.mutation({
      query: (data) => ({
        url: `${BANK_ACCOUNTS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BankAccounts" as any],
    }),
    getAccountingBankAccounts: builder.query({
      query: () => ({
        url: `${BANK_ACCOUNTS}`,
        method: "GET",
      }),
      providesTags: ["BankAccounts" as any],
    }),
    getAccountingBankAccountById: builder.query({
      query: (id) => ({
        url: `${BANK_ACCOUNTS}/${id}`,
        method: "GET",
      }),
      providesTags: ["BankAccounts" as any],
    }),
    updateAccountingBankAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BANK_ACCOUNTS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BankAccounts" as any],
    }),
    deleteAccountingBankAccount: builder.mutation({
      query: (id) => ({
        url: `${BANK_ACCOUNTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BankAccounts" as any],
    }),

    //AccountingBankTransactions
    accountingBankTransactions: builder.mutation({
      query: (data) => ({
        url: `${BANK_TRANSACTIONS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BankTransactions" as any],
    }),
    getAccountingBankTransactions: builder.query({
      query: (bankAccountId: number) => ({
        url: `${BANK_TRANSACTIONS}/?bankAccountId=${bankAccountId}`,
        method: "GET",
      }),
      providesTags: ["BankTransactions" as any],
    }),
    getAccountingBankTransactionsById: builder.query({
      query: (id) => ({
        url: `${BANK_TRANSACTIONS}/${id}`,
        method: "GET",
      }),
      providesTags: ["BankTransactions" as any],
    }),
    updateAccountingBankTransactions: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BANK_TRANSACTIONS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BankTransactions" as any],
    }),
    deleteAccountingBankTransactions: builder.mutation({
      query: (id) => ({
        url: `${BANK_TRANSACTIONS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BankTransactions" as any],
    }),
    // AccountingBills

    accountingBills: builder.mutation({
      query: (data) => ({
        url: `${BILLS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bills" as any],
    }),
    getAccountingBills: builder.query({
      query: (filters: { supplierId: string | number, status: string }) => ({
        url: `${BILLS}/?supplierId=${filters.supplierId}&status=${filters.status}`,
        method: "GET",
      }),
      providesTags: ["Bills" as any],
    }),
    getAccountingBillsById: builder.query({
      query: (id) => ({
        url: `${BILLS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Bills" as any],
    }),
    updateAccountingBills: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BILLS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bills" as any],
    }),
    deleteAccountingBills: builder.mutation({
      query: (id) => ({
        url: `${BILLS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bills" as any],
    }),
    //AccountingCustomers
    accountingCustomers: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers" as any],
    }),
    getAccountingCustomers: builder.query({
      query: (search: string) => ({
        url: `${CUSTOMERS}/?search=${search}`,
        method: "GET",
      }),
      providesTags: ["Customers" as any],
    }),
    getAccountingCustomersById: builder.query({
      query: (id) => ({
        url: `${CUSTOMERS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Customers" as any],
    }),
    updateAccountingCustomers: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CUSTOMERS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customers" as any],
    }),
    deleteAccountingCustomers: builder.mutation({
      query: (id) => ({
        url: `${CUSTOMERS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers" as any],
    }),

    //AccountingExpenses
    accountingExpenses: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNTING_EXPENSES}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expenses" as any],
    }),
    getAccountingExpenses: builder.query({
      query: (filters: { fromDate: string, toDate: string }) => ({
        url: `${ACCOUNTING_EXPENSES}/?fromDate=${filters.fromDate}&toDate=${filters.toDate}`,
        method: "GET",
      }),
      providesTags: ["Expenses" as any],
    }),
    getAccountingExpensesById: builder.query({
      query: (id) => ({
        url: `${ACCOUNTING_EXPENSES}/${id}`,
        method: "GET",
      }),
      providesTags: ["Expenses" as any],
    }),
    getAccountingAuditLogs: builder.query({
      query: (filters?: { entityName?: string, action?: string }) => ({
        url: `${AUDIT_LOGS}/?entityName=${filters?.entityName || ""}&action=${filters?.action || ""}`,
        method: "GET",
      }),
      providesTags: ["AuditLogs" as any],
    }),
    updateAccountingExpenses: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ACCOUNTING_EXPENSES}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Expenses" as any],
    }),
    deleteAccountingExpenses: builder.mutation({
      query: (id) => ({
        url: `${ACCOUNTING_EXPENSES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses" as any],
    }),
    //AccountingInvoices
    accountingInvoices: builder.mutation({
      query: (data) => ({
        url: `${INVOICES}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoices" as any],
    }),
    sendAccountingInvoices: builder.mutation({
      query: (id: string | number) => ({
        url: `${INVOICES}/${id}/send`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Invoices" as any],
    }),
    getAccountingInvoices: builder.query({
      query: (filters: { customerId: string | number, status: string }) => ({
        url: `${INVOICES}/?customerId=${filters.customerId}&status=${filters.status}`,
        method: "GET",
      }),
      providesTags: ["Invoices" as any],
    }),
    getAccountingInvoicesById: builder.query({
      query: (id) => ({
        url: `${INVOICES}/${id}`,
        method: "GET",
      }),
      providesTags: ["Invoices" as any],
    }),
    updateAccountingInvoices: builder.mutation({
      query: ({ id, data }) => ({
        url: `${INVOICES}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Invoices" as any],
    }),
    deleteAccountingInvoices: builder.mutation({
      query: (id) => ({
        url: `${INVOICES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoices" as any],
    }),

    //AccountingJournals
    accountingJournals: builder.mutation({
      query: (data) => ({
        url: `${JOURNALS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Journals" as any],
    }),
    getAccountingJournals: builder.query({
      query: (filters: { fromDate: string, toDate: string }) => ({
        url: `${JOURNALS}/?fromDate=${filters.fromDate}&toDate=${filters.toDate}`,
        method: "GET",
      }),
      providesTags: ["Journals" as any],
    }),
    getAccountingJournalsById: builder.query({
      query: (id) => ({
        url: `${JOURNALS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Journals" as any],
    }),
    updateAccountingJournals: builder.mutation({
      query: ({ id, data }) => ({
        url: `${JOURNALS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Journals" as any],
    }),
    deleteAccountingJournals: builder.mutation({
      query: (id) => ({
        url: `${JOURNALS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Journals" as any],
    }),
    //AccountingPayments
    accountingPayments: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments" as any],
    }),
    allocateAccountingPayments: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PAYMENTS}/${id}/allocate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments" as any],
    }),
    getAccountingPayments: builder.query({
      query: (filters: { fromDate: string, toDate: string }) => ({
        url: `${PAYMENTS}/?fromDate=${filters.fromDate}&toDate=${filters.toDate}`,
        method: "GET",
      }),
      providesTags: ["Payments" as any],
    }),
    getAccountingPaymentsById: builder.query({
      query: (id) => ({
        url: `${PAYMENTS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Payments" as any],
    }),
    updateAccountingPayments: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PAYMENTS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Payments" as any],
    }),
    deleteAccountingPayments: builder.mutation({
      query: (id) => ({
        url: `${PAYMENTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments" as any],
    }),
    //AccountingPeriods
    accountingPeriods: builder.mutation({
      query: (data: { yyyyMM: string, reason: string }) => ({
        url: `${PERIODS}/${data.yyyyMM}/lock`,
        method: "POST",
        body: data.reason,
      }),
      invalidatesTags: ["Periods" as any],
    }),
    getAccountingPeriods: builder.query({
      query: () => ({
        url: `${PERIODS}/locks`,
        method: "GET",
      }),
      providesTags: ["Periods" as any],
    }),
    getAccountingPeriodsByyyyyMM: builder.query({
      query: (yyyyMM: string) => ({
        url: `${PERIODS}/${yyyyMM}/lock`,
        method: "GET",
      }),
      providesTags: ["Periods" as any],
    }),

    updateAccountingPeriods: builder.mutation({
      query: (data: { yyyyMM: string, reason: string }) => ({
        url: `${PERIODS}/${data.yyyyMM}/lock?reason=${encodeURIComponent(data.reason)}`,
        method: "PUT",
      }),
      invalidatesTags: ["Periods" as any],
    }),
    deleteAccountingPeriods: builder.mutation({
      query: (yyyyMM: string) => ({
        url: `${PERIODS}/${yyyyMM}/lock`,
        method: "DELETE",
      }),
      invalidatesTags: ["Periods" as any],
    }),
    //AccountingReconciliations
    accountingReconciliations: builder.mutation({
      query: (data) => ({
        url: `${RECONCILIATIONS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reconciliations" as any],
    }),
    getAccountingReconciliations: builder.query({
      query: (bankAccountId: number) => ({
        url: `${RECONCILIATIONS}/${bankAccountId}`,
        method: "GET",
      }),
      providesTags: ["Reconciliations" as any],
    }),
    getAccountingReconciliationsById: builder.query({
      query: (id) => ({
        url: `${RECONCILIATIONS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Reconciliations" as any],
    }),
    updateAccountingReconciliations: builder.mutation({
      query: ({ id, data }) => ({
        url: `${RECONCILIATIONS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reconciliations" as any],
    }),
    deleteAccountingReconciliations: builder.mutation({
      query: (id) => ({
        url: `${RECONCILIATIONS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reconciliations" as any],
    }),

    //AccountingRecurringTemplates
    accountingRecurringTemplates: builder.mutation({
      query: (data) => ({
        url: `${RECURRING_TEMPLATES}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RecurringTemplates" as any],
    }),
    runAccountingRecurringTemplates: builder.mutation({
      query: (data) => ({
        url: `${RECURRING_TEMPLATES}/run-due`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RecurringTemplates" as any],
    }),
    getAccountingRecurringTemplates: builder.query({
      query: () => ({
        url: `${RECURRING_TEMPLATES}`,
        method: "GET",
      }),
      providesTags: ["RecurringTemplates" as any],
    }),
    getAccountingRecurringTemplatesById: builder.query({
      query: (id) => ({
        url: `${RECURRING_TEMPLATES}/${id}`,
        method: "GET",
      }),
      providesTags: ["RecurringTemplates" as any],
    }),
    updateAccountingRecurringTemplates: builder.mutation({
      query: ({ id, data }) => ({
        url: `${RECURRING_TEMPLATES}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["RecurringTemplates" as any],
    }),
    deleteAccountingRecurringTemplates: builder.mutation({
      query: (id) => ({
        url: `${RECURRING_TEMPLATES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RecurringTemplates" as any],
    }),
    //AccountingReports
    accountingReports: builder.mutation({
      query: (data: { fromDate: string, toDate: string }) => ({
        url: `${REPORTS}/profit-loss/?fromDate=${data.fromDate}&toDate=${data.toDate}`,
        method: "GET",
      }),
      invalidatesTags: ["Reports" as any],
    }),
    agedReceivablesReports: builder.mutation({
      query: (asOfDate: string) => ({
        url: `${REPORTS}/aged-receivables/${asOfDate}`,
        method: "GET",
      }),
      invalidatesTags: ["Reports" as any],
    }),
    agedPayablesReports: builder.mutation({
      query: (asOfDate: string) => ({
        url: `${REPORTS}/aged-payables/${asOfDate}`,
        method: "GET",
      }),
      invalidatesTags: ["Reports" as any],
    }),
    //AccountingSuppliers
    accountingSuppliers: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIERS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Suppliers" as any],
    }),
    getAccountingSuppliers: builder.query({
      query: (search: string) => ({
        url: `${SUPPLIERS}?search=${search}`,
        method: "GET",
      }),
      providesTags: ["Suppliers" as any],
    }),
    getAccountingSuppliersById: builder.query({
      query: (id) => ({
        url: `${SUPPLIERS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Suppliers" as any],
    }),
    updateAccountingSuppliers: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SUPPLIERS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Suppliers" as any],
    }),
    deleteAccountingSuppliers: builder.mutation({
      query: (id) => ({
        url: `${SUPPLIERS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers" as any],
    }),

    //AccountingVat
    accountingVat: builder.mutation({
      query: (data) => ({
        url: `${VAT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vat" as any],
    }),
    getAccountingVat: builder.query({
      query: (search: string) => ({
        url: `${VAT}?search=${search}`,
        method: "GET",
      }),
      providesTags: ["Vat" as any],
    }),
    getAccountingVatSummary: builder.query({
      query: (params?: { fromDate?: string; toDate?: string; salesVatRate?: number; purchaseVatRate?: number }) => {
        const query = new URLSearchParams();
        if (params?.fromDate) query.append("fromDate", params.fromDate);
        if (params?.toDate) query.append("toDate", params.toDate);
        if (params?.salesVatRate) query.append("salesVatRate", String(params.salesVatRate));
        if (params?.purchaseVatRate) query.append("purchaseVatRate", String(params.purchaseVatRate));

        const queryString = query.toString();
        return {
          url: queryString ? `vat/summary?${queryString}` : `vat/summary`,
          method: "GET",
        };
      },
      providesTags: ["Vat" as any],
    }),
    getAccountingVatById: builder.query({
      query: (id) => ({
        url: `${VAT}/${id}`,
        method: "GET",
      }),
      providesTags: ["Vat" as any],
    }),
    updateAccountingVat: builder.mutation({
      query: ({ id, data }) => ({
        url: `${VAT}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Vat" as any],
    }),
    deleteAccountingVat: builder.mutation({
      query: (id) => ({
        url: `${VAT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vat" as any],
    }),


  }),


});

export const {
  // accountingAccounts
  useAccountingAccountsMutation,
  useGetAccountingAccountsQuery,
  useGetAccountingAccountByIdQuery,
  useUpdateAccountingAccountMutation,
  useDeleteAccountingAccountMutation,

  // accountingAuditLogs
  useAccountingAuditLogsQuery,

  // accountingBankAccounts
  useAccountingBankAccountsMutation,
  useGetAccountingBankAccountsQuery,
  useGetAccountingBankAccountByIdQuery,
  useUpdateAccountingBankAccountMutation,
  useDeleteAccountingBankAccountMutation,

  // AccountingBankTransactions
  useAccountingBankTransactionsMutation,
  useGetAccountingBankTransactionsQuery,
  useGetAccountingBankTransactionsByIdQuery,
  useUpdateAccountingBankTransactionsMutation,
  useDeleteAccountingBankTransactionsMutation,

  // AccountingBills
  useAccountingBillsMutation,
  useGetAccountingBillsQuery,
  useGetAccountingBillsByIdQuery,
  useUpdateAccountingBillsMutation,
  useDeleteAccountingBillsMutation,

  // AccountingCustomers
  useAccountingCustomersMutation,
  useGetAccountingCustomersQuery,
  useGetAccountingCustomersByIdQuery,
  useUpdateAccountingCustomersMutation,
  useDeleteAccountingCustomersMutation,

  // AccountingExpenses
  useAccountingExpensesMutation,
  useGetAccountingExpensesQuery,
  useGetAccountingExpensesByIdQuery,
  useUpdateAccountingExpensesMutation,
  useDeleteAccountingExpensesMutation,

  // AccountingInvoices
  useAccountingInvoicesMutation,
  useSendAccountingInvoicesMutation,
  useGetAccountingInvoicesQuery,
  useGetAccountingInvoicesByIdQuery,
  useGetAccountingAuditLogsQuery,
  useUpdateAccountingInvoicesMutation,
  useDeleteAccountingInvoicesMutation,

  // AccountingJournals
  useAccountingJournalsMutation,
  useGetAccountingJournalsQuery,
  useGetAccountingJournalsByIdQuery,
  useUpdateAccountingJournalsMutation,
  useDeleteAccountingJournalsMutation,

  // AccountingPayments
  useAccountingPaymentsMutation,
  useAllocateAccountingPaymentsMutation,
  useGetAccountingPaymentsQuery,
  useGetAccountingPaymentsByIdQuery,
  useUpdateAccountingPaymentsMutation,
  useDeleteAccountingPaymentsMutation,

  // AccountingPeriods
  useAccountingPeriodsMutation,
  useGetAccountingPeriodsQuery,
  useGetAccountingPeriodsByyyyyMMQuery,
  useUpdateAccountingPeriodsMutation,
  useDeleteAccountingPeriodsMutation,

  // AccountingReconciliations
  useAccountingReconciliationsMutation,
  useGetAccountingReconciliationsQuery,
  useGetAccountingReconciliationsByIdQuery,
  useUpdateAccountingReconciliationsMutation,
  useDeleteAccountingReconciliationsMutation,

  // AccountingRecurringTemplates
  useAccountingRecurringTemplatesMutation,
  useRunAccountingRecurringTemplatesMutation,
  useGetAccountingRecurringTemplatesQuery,
  useGetAccountingRecurringTemplatesByIdQuery,
  useUpdateAccountingRecurringTemplatesMutation,
  useDeleteAccountingRecurringTemplatesMutation,

  // AccountingReports
  useAccountingReportsMutation,
  useAgedReceivablesReportsMutation,
  useAgedPayablesReportsMutation,

  // AccountingSuppliers
  useAccountingSuppliersMutation,
  useGetAccountingSuppliersQuery,
  useGetAccountingSuppliersByIdQuery,
  useUpdateAccountingSuppliersMutation,
  useDeleteAccountingSuppliersMutation,

  // AccountingVat
  useAccountingVatMutation,
  useGetAccountingVatQuery,
  useGetAccountingVatSummaryQuery,
  useLazyGetAccountingVatSummaryQuery,
  useGetAccountingVatByIdQuery,
  useUpdateAccountingVatMutation,
  useDeleteAccountingVatMutation,
} = accountingApiSlice;
