"use client";

import React, { useState } from "react";
import AboutPage from "@/components/ui/AboutPage";
import General from "@/components/settings/General";
import Security from "@/components/settings/Security";
import Notifications from "@/components/settings/Notifications";
import System from "@/components/settings/System";
import { Form } from "react-final-form";
import { SettingFormValues } from "@/components/types/formFields";
import Users from "@/components/settings/Users";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("General");

  const buttons = [
    { label: "General" },
    { label: "Security" },
    { label: "Notifications" },
    { label: "System" },
    { label: "Users" },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const onSubmit = (values: SettingFormValues) => {
    console.log(values);
  };

  const validateForm = () => {
    const errors: Partial<SettingFormValues> = {};
    return errors;
  };

  return (
    <main className="w-full">
      <AboutPage about="Manage your application preferences and configuration" />

      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-2 ">
          {buttons.map((button) => (
            <button
              key={button.label}
              className={`text-black px-4 py-2 border border-gray-300 rounded-md ${
                activeTab === button.label ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleTabClick(button.label)}
            >
              {button.label}
            </button>
          ))}
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>

      <Form<SettingFormValues>
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} className="w-full">
            {activeTab === "General" && <General form={form} />}
            {activeTab === "Security" && <Security form={form} />}
            {activeTab === "Notifications" && <Notifications form={form} />}
            {activeTab === "System" && <System form={form} />}
          </form>
        )}
      />
      {activeTab === "Users" && <Users />}
    </main>
  );
};

export default Settings;
