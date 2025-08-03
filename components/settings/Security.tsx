import React from "react";
import { SettingFormProps } from "../types/formFields";
import { BiLock } from "react-icons/bi";
import TextInput from "../ui/TextInput";
import SelectInput from "../ui/SelectInput";
import Toggle from "../ui/Toggle";

const Security = ({ form }: SettingFormProps) => {
  return (
    <section className="w-full mt-5 bg-white p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-5">
        <BiLock className="font-bold" />
        <h2 className="text-lg font-semibold">Authentication</h2>
      </div>
      <div className="w-full space-y-4">
        <Toggle
          name="twoFactorAuth"
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        />

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Session Timeout (minutes)"
            name="sessionTimeout"
            type="number"
            placeholder="Session Timeout"
            form={form}
          />
          <SelectInput
            label="Password Policy"
            name="passwordPolicy"
            options={[]}
            form={form}
          />
        </div>
        <Toggle name="loginNotifications" label="Login Notifications" />
        <Toggle name="autoLogout" label="Auto Logout on Inactivity" />
      </div>
    </section>
  );
};

export default Security;
