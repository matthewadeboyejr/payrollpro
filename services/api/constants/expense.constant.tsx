import apiSlice from "../apiSlice";
import { EXPENSE_CATEGORIES, EXPENSE_SUMMARY, EXPENSES, INCOME, INCOME_CATEGORIES, INCOME_SUMMARY } from "./constants";

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getExpense: builder.query({
      query: (expenseFilters) => ({
        url: `${EXPENSES}?employeeId=${expenseFilters.employeeId}&status=${expenseFilters.status}&page=${expenseFilters.page}&pageSize=${expenseFilters.pageSize}&search=${expenseFilters.search}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    getExpenseById: builder.query({
      query: (expenseId) => ({
        url: `${EXPENSES}/${expenseId}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    createExpense: builder.mutation({
      query: (expenseData) => ({
        url: `${EXPENSES}`,
        body: expenseData,
        method: "POST",
      }),
      invalidatesTags: ["Expenses"],
    }),
    reviewExpense: builder.mutation({
      query: ({ payload, expenseId }) => ({
        url: `${EXPENSES}/${expenseId}/approve`,
        body: payload,
        method: "POST",
      }),
      invalidatesTags: ["Expenses"],
    }),
    editExpense: builder.mutation({
      query: ({ payload, expenseId }) => ({
        url: `${EXPENSES}/${expenseId}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `${EXPENSES}/${expenseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
    getExpenseCategories: builder.query({
      query: () => ({
        url: `${EXPENSE_CATEGORIES}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    getExpenseCategoriesById: builder.query({
      query: (expenseCategoryId) => ({
        url: `${EXPENSE_CATEGORIES}/${expenseCategoryId}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    postExpenseCategories: builder.mutation({
      query: (expenseCategoryData) => ({
        url: `${EXPENSE_CATEGORIES}`,
        method: "POST",
        body: expenseCategoryData,
      }),
      invalidatesTags: ["Expenses"],
    }),
    editExpenseCategories: builder.mutation({
      query: ({ payload, expenseCategoryId }) => ({
        url: `${EXPENSE_CATEGORIES}/${expenseCategoryId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpenseCategories: builder.mutation({
      query: (expenseCategoryId) => ({
        url: `${EXPENSE_CATEGORIES}/${expenseCategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
    getExpenseSummary: builder.query({
      query: (filters) => ({
        url: `${EXPENSE_SUMMARY}?startDate=${filters.startDate}&endDate=${filters.endDate}`,
        method: "GET",
      }),
      providesTags: ["ExpenseSummary", "Expenses"],
    }),
    getIncome: builder.query({
      query: (incomeFilters) => ({
        url: `${INCOME}?employeeId=${incomeFilters.employeeId}&fromDate=${incomeFilters.fromDate}&toDate=${incomeFilters.toDate}&categoryId=${incomeFilters.categoryId}&page=${incomeFilters.page}&pageSize=${incomeFilters.pageSize}&search=${incomeFilters.search}`,
        method: "GET",
      }),
      providesTags: ["Income"],
    }),
    getIncomeById: builder.query({
      query: (incomeId) => ({
        url: `${INCOME}/${incomeId}`,
        method: "GET",
      }),
      providesTags: ["Income"],
    }),
    postIncome: builder.mutation({
      query: (incomeData) => ({
        url: `${INCOME}`,
        method: "POST",
        body: incomeData,
      }),
      invalidatesTags: ["Income"],
    }),

    editIncome: builder.mutation({
      query: ({ payload, incomeId }) => ({
        url: `${INCOME}/${incomeId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Income"],
    }),
    reviewIncome: builder.mutation({
      query: ({ payload, incomeId }) => ({
        url: `${INCOME}/${incomeId}/approve`,
        body: payload,
        method: "POST",
      }),
      invalidatesTags: ["Income"],
    }),
    deleteIncome: builder.mutation({
      query: (incomeId) => ({
        url: `${INCOME}/${incomeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Income"],
    }),
    //incomeCategories
    getIncomeCategories: builder.query({
      query: () => ({
        url: `${INCOME_CATEGORIES}`,
        method: "GET",
      }),
      providesTags: ["IncomeCategories"],
    }),
    getIncomeCategoriesById: builder.query({
      query: (incomeCategoryId) => ({
        url: `${INCOME_CATEGORIES}/${incomeCategoryId}`,
        method: "GET",
      }),
      providesTags: ["IncomeCategories"],
    }),
    postIncomeCategories: builder.mutation({
      query: (incomeCategoryData) => ({
        url: `${INCOME_CATEGORIES}`,
        method: "POST",
        body: incomeCategoryData,
      }),
      invalidatesTags: ["IncomeCategories"],
    }),
    editIncomeCategories: builder.mutation({
      query: ({ payload, incomeCategoryId }) => ({
        url: `${INCOME_CATEGORIES}/${incomeCategoryId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["IncomeCategories"],
    }),
    getIncomeSummary: builder.query({
      query: (filters) => ({
        url: `${INCOME_SUMMARY}?startDate=${filters.startDate}&endDate=${filters.endDate}`,
        method: "GET",
      }),
      providesTags: ["IncomeSummary", "Income"],
    }),
    deleteIncomeCategories: builder.mutation({
      query: (incomeCategoryId) => ({
        url: `${INCOME_CATEGORIES}/${incomeCategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["IncomeCategories"],
    }),
  }),
});


export const {
  useGetExpenseQuery,
  useCreateExpenseMutation,
  useGetExpenseByIdQuery,
  useEditExpenseMutation,
  useReviewExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseCategoriesQuery,
  useGetExpenseCategoriesByIdQuery,
  usePostExpenseCategoriesMutation,
  useEditExpenseCategoriesMutation,
  useDeleteExpenseCategoriesMutation,
  useGetIncomeQuery,
  useGetIncomeByIdQuery,
  usePostIncomeMutation,
  useEditIncomeMutation,
  useReviewIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomeCategoriesQuery,
  useGetIncomeCategoriesByIdQuery,
  usePostIncomeCategoriesMutation,
  useEditIncomeCategoriesMutation,
  useDeleteIncomeCategoriesMutation,
  useGetIncomeSummaryQuery,
  useGetExpenseSummaryQuery,
} = expensesApiSlice;
