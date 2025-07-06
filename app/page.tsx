import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="md:text-7xl text-4xl font-bold text-center ">
            Smart Payroll & <br /> Tax Management, Simplified
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Automate payroll, ensure tax compliance, and manage your
            workforce—all from one seamless, powerful platform. Designed for
            modern HR teams.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth"
              className=" p-4 md:w-5xl bg-[#2663eb] hover:bg-[#1e40af] text-white rounded-md text-lg font-semibold"
            >
              Access PayrollPro
            </Link>
            <Link
              href="/auth"
              className=" p-4  border  text-black rounded-md text-lg font-semibold"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
