import { FiUser } from "react-icons/fi";
import { TbCalendarUser } from "react-icons/tb";

const LeaveBalance = () => {
  const employeeLeaveBalanceData = [
    {
      name: "Sarah Johnson",
      id: "EMP001",
      annualLeave: {
        name: "Annual Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
      sickLeave: {
        name: "Sick Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
      personalLeave: {
        name: "Personal Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
    },
    {
      name: "Mike Chen",
      id: "EMP002",
      annualLeave: {
        name: "Annual Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
      sickLeave: {
        name: "Sick Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
      personalLeave: {
        name: "Personal Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
    },
    {
      name: "Emily Davis",
      id: "EMP003",
      annualLeave: {
        name: "Annual Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
      sickLeave: {
        name: "Sick Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
      personalLeave: {
        name: "Personal Leave",
        days: 15,
        used: 10,
        remaining: 15,
      },
    },
  ];

  return (
    <section className="mt-5  overflow-x-auto flex gap-4 items-center">
      {employeeLeaveBalanceData.map((employee, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-sm space-y-3 md:w-96 w-full"
        >
          <div className="flex items-center gap-2 justify-between   rounded-sm ">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <span>
                <FiUser />
              </span>
              <span>{employee.name}</span>
            </h2>

            <p className="border border-gray-300 rounded-full py-1 px-2 text-sm font-semibold text-black ">
              ID: {employee.id}
            </p>
          </div>
          {/* Annual leave */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-between ">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-blue-500">
                  <TbCalendarUser />
                </span>
                <span>Annual Leave </span>
              </h3>

              <p className="  text-xs font-medium text-gray-500 ">
                {employee.annualLeave.days} of {employee.annualLeave.days} days
                left
              </p>
            </div>
            <div className="h-2 bg-blue-50 w-full rounded-full ">
              <div className="h-full bg-blue-500 rounded-full w-1/2 "></div>
            </div>
            <div className="flex items-center gap-2 justify-between   ">
              <p className="  text-xs font-medium text-gray-500 ">
                Used: {employee.annualLeave.used} days
              </p>

              <p className="  text-xs font-medium text-gray-500 ">
                Remaining: {employee.annualLeave.remaining} days
              </p>
            </div>
          </div>
          {/* sick leave */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-between ">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-red-500">
                  <TbCalendarUser />
                </span>
                <span>Sick Leave </span>
              </h3>

              <p className="  text-xs font-medium text-gray-500 ">
                {employee.sickLeave.days} of {employee.sickLeave.days} days left
              </p>
            </div>
            <div className="h-2 bg-blue-50 w-full rounded-full ">
              <div className="h-full bg-blue-500 rounded-full w-1/2 "></div>
            </div>
            <div className="flex items-center gap-2 justify-between   ">
              <p className="  text-xs font-medium text-gray-500 ">
                Used: {employee.sickLeave.used} days
              </p>

              <p className="  text-xs font-medium text-gray-500 ">
                Remaining: {employee.sickLeave.remaining} days
              </p>
            </div>
          </div>
          {/* personal leave */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-between ">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-purple-500">
                  <TbCalendarUser />
                </span>
                <span>Personal Leave</span>
              </h3>

              <p className="  text-xs font-medium text-gray-500 ">
                {employee.personalLeave.days} of {employee.personalLeave.days}
                days left
              </p>
            </div>
            <div className="h-2 bg-blue-50 w-full rounded-full ">
              <div className="h-full bg-blue-500 rounded-full w-1/2 "></div>
            </div>
            <div className="flex items-center gap-2 justify-between   ">
              <p className="  text-xs font-medium text-gray-500 ">
                Used: {employee.personalLeave.used} days
              </p>

              <p className="  text-xs font-medium text-gray-500 ">
                Remaining: {employee.personalLeave.remaining} days
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default LeaveBalance;
