export interface AccountingAccount {
  code: string;
  name: string;
  type: string;
  currency: string;
  openingBalance: number;
}

export interface BankAccount {
  name: string;
  bankName: string;
  sortCode: string;
  accountNumberMasked: string;
  currency: string;
  openingBalance: number;
}

export interface BankTransaction {
  bankAccountId: number;
  transactionDate: string;
  direction: "In" | "Out";
  amount: number;
  reference: string;
  description: string;
}

export interface BillLine {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Bill {
  supplierId: number;
  billDate: string;
  dueDate: string;
  currency: string;
  lines: BillLine[];
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentTermsDays: number;
  openingBalance: number;
}

export interface Supplier {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentTermsDays: number;
  openingBalance: number;
}

export interface InvoiceLine {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateInvoiceRequest {
  customerId: number;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  lines: InvoiceLine[];
}
