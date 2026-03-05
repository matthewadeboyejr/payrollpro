import React from "react";
import { useTheme } from "next-themes";
import { SettingFormProps } from "../types/formFields";
import { BsDatabase } from "react-icons/bs";
import SelectInput from "../ui/SelectInput";
import TextInput from "../ui/TextInput";
import { BiBell } from "react-icons/bi";
import Toggle from "../ui/Toggle";

const System = ({ form }: SettingFormProps) => {
  const { theme, setTheme } = useTheme();

  // Sync theme with form state
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (form as any).change("darkMode", theme === "dark");
  }, [theme, form]);

  return (
    <div>
      <section className="w-full mt-5 bg-white p-4 rounded-lg dark:bg-gray-800">
        <div className="flex items-center gap-2 mb-5">
          <BiBell className="font-bold dark:text-white" />
          <h2 className="text-lg font-semibold dark:text-white">Appearance & Interface</h2>
        </div>
        <div className="w-full space-y-4">
          <Toggle
            name="darkMode"
            label="Dark Mode"
            description="Switch to dark theme"
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </div>
      </section>
      <section className="w-full mt-5 bg-white p-4 rounded-lg dark:bg-gray-800">
        <div className="flex items-center gap-2 mb-5">
          <BsDatabase className="font-bold dark:text-white" />
          <h2 className="text-lg font-semibold dark:text-white">Data Management</h2>
        </div>
        <div className="w-full space-y-4">
          <Toggle
            name="automaticBackup"
            label="Automatic Backup"
            description="Enable automatic data backups"
          />
          <div className="grid grid-cols-2 gap-2">
            <SelectInput
              label="Backup Frequency"
              name="backupFrequency"
              options={[
                { value: "Daily", label: "Daily" },
                { value: "Weekly", label: "Weekly" },
                { value: "Monthly", label: "Monthly" },
              ]}
              form={form}
            />
            <TextInput
              label="Data Retention (years)"
              name="dataRetention"
              type="number"
              placeholder="Data Retention"
              form={form}
            />
          </div>
          <Toggle
            name="debugMode"
            label="Debug Mode"
            description="Enable debug logging (for developers)"
          />
        </div>
      </section>
    </div>
  );
};

export default System;
