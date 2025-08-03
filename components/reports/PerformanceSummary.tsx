import React from "react";

const PerformanceSummary = () => {
  const activity = [
    {
      department: "Engineering",
      amount: "£100,000",
      number: "23",
      status: "success",
      percentage: "10%",
      color: "bg-green-400",
    },
  ];
  return (
    <section className="bg-white p-4 rounded-lg w-full mt-5">
      <div className="flex items-center gap-2 mb-5">
        {/*  <CiClock2 className="font-bold" /> */}
        <h2 className="text-lg font-semibold">
          Department Performance Summary
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {activity.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 bg-gray-100 md:p-5 p-2 rounded-lg"
          >
            <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
            <div className="w-full">
              <p className="text-xs text-gray-500 flex items-center  gap-1 justify-between w-full">
                <span className="font-semibold text-black text-lg">
                  {item.department}
                </span>
                <span className="font-semibold text-black text-lg">
                  {item.amount}
                </span>
              </p>
              <p className="text-xs text-gray-500 flex items-center  gap-1 justify-between w-full">
                <span className="text-gray-500">{`${item.number} employees avg`}</span>
                <span className="text-black font-semibold">
                  {item.percentage}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerformanceSummary;
