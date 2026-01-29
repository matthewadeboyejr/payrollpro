import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCalendar, FiDollarSign, FiLayers, FiFileText } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

const Navbar = () => (
  <nav className="absolute w-full z-50 bg-transparent">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2 text-white">
            <LuBuilding2 size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">PayrollPro</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-gray-600 hover:text-black font-medium text-sm transition-colors">Features</Link>
          <Link href="#" className="text-gray-600 hover:text-black font-medium text-sm transition-colors">Pricing</Link>
          <Link href="#" className="text-gray-600 hover:text-black font-medium text-sm transition-colors">Resources</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-sm font-medium text-gray-900 hover:text-black transition-colors">Login</Link>
          <Link href="/auth" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Get Started</Link>
        </div>
      </div>
    </div>
  </nav>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 relative">
      <Navbar />

      {/* Vertical Grid Background - RESTORED */}
      <div className="absolute inset-0 z-0 pointer-events-none h-[120vh]" style={{ backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px)', backgroundSize: '6rem 100%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-visible z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Shift Compounding Chaos <br />
            into <span className="text-blue-600">Calculated Clarity</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed bg-white/50 backdrop-blur-sm rounded-xl p-2 inline-block">
            The all-in-one platform for Rota Scheduling, Payroll Processing, and Tax Compliance.
            Stop juggling spreadsheets and start managing your workforce efficiently.
          </p>

          <div className="flex justify-center gap-4 mb-20 relative z-20">
            <Link href="/auth" className="bg-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Start Free Trial
            </Link>
            <Link href="/auth" className="bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-full font-medium hover:bg-gray-50 transition-all">
              View Demo
            </Link>
          </div>

          {/* Stacked Dashboard Image */}
          <div className="relative mx-auto max-w-5xl group">
            {/* Modern Gradient Glow - Stronger and properly positioned */}
            <div className="absolute -inset-1 lg:-inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-[2rem] blur-3xl opacity-40 -z-10 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>

            {/* Abstract background cards for stacked effect */}
            <div className="absolute top-4 left-4 right-4 h-full bg-white border border-gray-200 shadow-sm rounded-2xl -z-10 scale-[0.98] transform transition-transform group-hover:scale-[0.99] origin-bottom"></div>
            <div className="absolute top-8 left-8 right-8 h-full bg-white border border-gray-200 shadow-sm rounded-2xl -z-20 scale-[0.96] transform transition-transform group-hover:scale-[0.98] origin-bottom"></div>

            <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-200 overflow-hidden relative z-0">
              <Image
                src="/assets/dashboard-preview.png"
                alt="Dashboard Preview"
                width={1400}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-gray-100 relative z-20 bg-white/80 backdrop-blur-sm">
            <p className="text-center text-sm font-medium text-gray-400 mb-8">Trusted by forward-thinking companies</p>
            <div className="flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Logos Placeholder */}
              <span className="font-bold text-xl text-gray-800">TechNova</span>
              <span className="font-bold text-xl text-gray-800">GreenLeaf</span>
              <span className="font-bold text-xl text-gray-800">BuildRight</span>
              <span className="font-bold text-xl text-gray-800">SwiftLogistics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold mb-2 text-sm uppercase tracking-wide">The Challenge</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Rota Conflicts shouldn&apos;t <br />
                delay Payday
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Manual spreadsheets lead to double-booked shifts, incorrect wages, and endless tax headaches.
                PayrollPro connects your schedule directly to your payroll, ensuring every minute worked is accurately paid and taxed.
              </p>
              <Link href="/auth" className="bg-black text-white px-6 py-3 rounded-full font-medium inline-block hover:opacity-80 transition-opacity">
                Why PayrollPro?
              </Link>

              <div className="grid grid-cols-3 gap-8 mt-16 border-t border-gray-100 pt-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">40+</h3>
                  <p className="text-sm text-gray-500 mt-1">Hours/Mo Saved</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">100%</h3>
                  <p className="text-sm text-gray-500 mt-1">Tax Accuracy</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">0</h3>
                  <p className="text-sm text-gray-500 mt-1">Shift Conflicts</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 relative overflow-hidden">
              {/* Representation of 'Chaos' vs 'Order' */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-100 rounded-full blur-[80px] opacity-40"></div>
              <div className="relative z-10 bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">!</div>
                  <span className="font-semibold text-gray-900">Shift Conflict Detected</span>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Sarah M. is double booked for:</p>
                  <div className="bg-red-50 text-red-700 p-2 rounded text-sm font-medium">Morning Shift (09:00 - 13:00)</div>
                  <div className="bg-red-50 text-red-700 p-2 rounded text-sm font-medium">Inventory Check (11:00 - 15:00)</div>
                  <div className="mt-4 pt-2 text-center text-blue-600 font-medium text-sm cursor-pointer hover:underline">
                    Resolve Automatically &rarr;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features - SPECIFIC TO PAYROLL/ROTA */}
      <section className="py-24 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold mb-2 text-sm uppercase tracking-wide">Integrated Solution</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Workforce Management</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From the first shift to the final payslip, we handle every step of your employee lifecycle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Rota Scheduling */}
            <div className="col-span-1 bg-white rounded-[2rem] p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-default border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                <FiCalendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Rota</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Drag-and-drop shift planning with instant conflict alerts and employee availability checks.</p>
            </div>

            {/* Card 2: Tax Compliance */}
            <div className="col-span-1 bg-white rounded-[2rem] p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-default border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl shadow-sm flex items-center justify-center text-green-600 mb-6">
                <FiFileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Auto-Tax Filing</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Never miss a deadline. Automated HMRC calculations and real-time tax code updates.</p>
            </div>

            {/* Card 3: Expenses */}
            <div className="col-span-1 bg-white rounded-[2rem] p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-default border border-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-xl shadow-sm flex items-center justify-center text-purple-600 mb-6">
                <FiDollarSign size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expense Claims</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Snap receipts, approve claims, and reimburse directly through payroll in one click.</p>
            </div>

            {/* Large Card: Payroll Automation */}
            <div className="col-span-1 md:col-span-3 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden group border border-gray-800">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-white mb-6 border border-gray-700">
                    <FiLayers size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Run Payroll in Minutes</h3>
                  <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                    Turn hours of calculation into a few clicks. Our engine automatically pulls hours from the rota, applies tax, and generates payslips.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20">
                    View Payroll Engine <FiArrowRight />
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 text-gray-900 shadow-2xl transform translate-y-8 group-hover:translate-y-6 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      <div>
                        <p className="text-sm font-bold">Payroll Batch #2024-05</p>
                        <p className="text-xs text-gray-500">Processing...</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full">Ready</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-500">Gross Pay (128 Employees)</span>
                      <span className="font-bold">£342,500.00</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-500">Tax & NI Deductions</span>
                      <span className="font-bold text-red-500">-£68,450.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-sm font-bold text-gray-900">Total Net Payable</span>
                      <span className="font-bold text-blue-600 text-lg">£274,050.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-gray-100 text-center text-gray-500 text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} PayrollPro Enterprise. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Simple Icon component for the missing file text icon if typical import fails, though react-icons/fi usually has it. 
// Just in case, defining it or using FiFileText from import if available.
// Since I imported FiFileText from react-icons/fi above, I don't need this local definition unless the import is wrong. 
// react-icons/fi has FiFileText. I will trust the import.
