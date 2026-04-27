"use client";

import React, { useState } from "react";
import AboutPage from "@/components/ui/AboutPage";
import AccountingOverview from "@/components/accounting/AccountingOverview";
import BankingSection from "@/components/accounting/BankingSection";
import SalesSection from "@/components/accounting/SalesSection";
import PurchasesSection from "@/components/accounting/PurchasesSection";
import PaymentSection from "@/components/accounting/PaymentSection";
import { FiHome, FiCreditCard, FiTrendingUp, FiShoppingBag, FiSettings, FiDollarSign } from "react-icons/fi";
import ReportsAndSetup from "@/components/accounting/ReportsAndSetup";

const AccountingPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <FiHome /> },
    { id: "banking", label: "Banking", icon: <FiCreditCard /> },
    { id: "sales", label: "Sales (Invoicing)", icon: <FiTrendingUp /> },
    { id: "purchases", label: "Purchases (Bills)", icon: <FiShoppingBag /> },
    { id: "payments", label: "Payments", icon: <FiDollarSign /> },
    { id: "reports", label: "Reports & Setup", icon: <FiSettings /> },
  ];

  return (
    <main className="w-full flex flex-col gap-6">
      <AboutPage about="Comprehensive financial management and UK tax compliance for your business." />

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all border-b-2 tracking-tight uppercase ${activeTab === tab.id
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <section className="min-h-[60vh] animate-in fade-in duration-500">
        {activeTab === "overview" && <AccountingOverview />}
        {activeTab === "banking" && <BankingSection />}
        {activeTab === "sales" && <SalesSection />}
        {activeTab === "purchases" && <PurchasesSection />}
        {activeTab === "payments" && <PaymentSection />}
        {activeTab === "reports" && <ReportsAndSetup />}
      </section>
    </main>
  );
};

export default AccountingPage;
