"use client";

import Signin from "@/components/auth/Signin";
import React, { useState } from "react";
import Signup from "@/components/auth/Signup";
import { overviewData } from "@/components/data/overviewData";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <main className="h-screen flex w-screen px-5 md:px-40 2xl:px-50 justify-center items-center">
      <section className="flex flex-col-reverse  md:flex-row items-center w-full gap-10">
        {/* payrollpro Intro */}
        <div className="space-y-5 w-full md:w-1/2 flex-col justify-center hidden md:flex">
          <h1 className="md:text-5xl xl:text-6xl 2xl:text-7xl font-black ">
            Modern Payroll & Tax Management
          </h1>
          <p className="text-lg text-gray-600">
            Streamline your HR operations with automated payroll, tax
            compliance, and employee management in one powerful platform.
          </p>
          {/* payrollpro overview */}
          <div className="flex justify-around ">
            {overviewData.map((data, index) => {
              return (
                <div className="flex flex-col  items-center gap-2" key={index}>
                  <div>{data.icon}</div>
                  <h3 className="text-sm font-semibold"> {data.title}</h3>
                  <p className="text-xs tracking-wide text-center max-w-[150px] text-gray-600 font-semi">
                    {data.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* form Intro */}
        <div className="w-full md:w-1/2">
          <div className=" w-full  flex flex-col justify-center p-5 md:p-[20px] lg:p-[70px] bg-white rounded-xl">
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-semibold ">Get Started</h2>
                <p className="pb-5 text-xs xl:text-sm font-medium text-gray-600">
                  Sign in to your account or create a new one
                </p>
              </div>

              <div className="flex justify-center gap-5 bg-gray-100 rounded-lg p-2">
                <button
                  className={` w-full p-2 rounded-lg text-sm font-semibold ${
                    activeTab === "signin" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("signin")}
                >
                  Sign in
                </button>
                <button
                  className={` w-full p-2 rounded-lg text-sm font-semibold ${
                    activeTab === "signup" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  Create Account
                </button>
              </div>

              {activeTab === "signin" ? <Signin /> : <Signup />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
