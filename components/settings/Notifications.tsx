import React from "react";
import { BiBell } from "react-icons/bi";
import { SettingFormProps } from "../types/formFields";
import Toggle from "../ui/Toggle";

const Notifications = ({ }: SettingFormProps) => {
  return (
    <section className="w-full mt-5 bg-white p-4 rounded-lg dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-5">
        <BiBell className="font-bold dark:text-white" />
        <h2 className="text-lg font-semibold dark:text-white">Notification Preferences</h2>
      </div>
      <div className="w-full space-y-4">
        <Toggle
          name="emailNotifications"
          label="Email Notifications"
          description="Receive notifications via email"
        />

        <Toggle
          name="pushNotifications"
          label="Push Notifications"
          description="Receive push notifications in browser"
        />
        <Toggle
          name="weeklyReports"
          label="Weekly Reports"
          description="Receive weekly summary reports"
        />
        <Toggle
          name="systemAlerts"
          label="System Alerts"
          description="Receive critical system notifications"
        />
      </div>
    </section>
  );
};

export default Notifications;
