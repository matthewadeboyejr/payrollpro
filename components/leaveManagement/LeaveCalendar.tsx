import React, { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../ui/Modal";
import LeaveDetails from "./sub-component/LeaveDetails";
import { LeaveDetails as LeaveDetailsType } from "../types/Leave";

// 1. Setup the Localizer (Required for React Big Calendar)
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 2. Define TypeScript Interfaces based on your JSON data
interface LeaveRequest {
  id: number;
  title: string;
  employeeId: number;
  leaveTypeId: number;
  requestNo: string;
  start: string; // API sends strings
  end: string; // API sends strings
  status: string;
  color: string;
  // Additional fields for modal display
  employeeName?: string;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
  comment?: string | null;
  approvedBy?: string | null;
  dayRequested?: number;
  hoursRequested?: number;
  remainingBalance?: number;
  createdAt?: string;
  approvedDate?: string;
}

// The shape of the event object the Calendar component expects
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: LeaveRequest; // Store original data here for access later
}

interface LeaveCalendarProps {
  data: LeaveRequest[];
}

const LeaveCalendar: React.FC<LeaveCalendarProps> = ({ data }) => {
  // State for controlling calendar navigation and view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month");
  const [selectedLeave, setSelectedLeave] = useState<LeaveDetailsType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Transform API data to Calendar Events
  const events: CalendarEvent[] = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.title, // e.g., "David Ali - Annual Leave"
      start: new Date(item.start), // Convert ISO string to JS Date
      end: new Date(item.end), // Convert ISO string to JS Date
      resource: item, // Pass the full object so we can access status/color
    }));
  }, [data]);

  // 4. Custom Styler to use the 'color' from your JSON
  const eventStyleGetter = (event: CalendarEvent) => {
    const backgroundColor = event.resource.color || "#3174ad"; // Fallback color
    return {
      style: {
        backgroundColor: backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  // Navigation handler for prev/next buttons
  const handleNavigate = (newDate: Date, view?: View) => {
    setCurrentDate(newDate);
    if (view) {
      setCurrentView(view);
    }
  };

  // View change handler (month/week/day)
  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  // Handle event selection - transform data and show modal
  const handleSelectEvent = (event: CalendarEvent) => {
    const resource = event.resource;

    // Transform resource data to LeaveDetailsType format
    // The resource now contains all necessary fields from the parent component
    const leaveDetails: LeaveDetailsType = {
      id: resource.id,
      requestNo: resource.requestNo,
      employeeName:
        resource.employeeName || resource.title.split(" - ")[0] || "",
      leaveType: resource.leaveType || resource.title.split(" - ")[1] || "",
      startDate: resource.startDate || resource.start,
      endDate: resource.endDate || resource.end,
      status: resource.status,
      reason: resource.reason || "",
      comment: resource.comment ?? null,
      approvedBy: resource.approvedBy ?? null,
      dayRequested: (resource.dayRequested || 1) as 1, // Type assertion needed due to interface definition
      hoursRequested: (resource.hoursRequested || 0) as 0, // Type assertion needed due to interface definition
      remainingBalance: (resource.remainingBalance || 0) as 0, // Type assertion needed due to interface definition
      createdAt: (resource.createdAt || new Date().toISOString()) as string, // Type assertion needed due to interface definition
      approvedDate: (resource.approvedDate || "") as string, // Type assertion needed due to interface definition
    };

    setSelectedLeave(leaveDetails);
    setIsModalOpen(true);
  };

  return (
    <>
      <div style={{ height: "600px", padding: "20px" }}>
        <h2 className="text-lg font-semibold mb-4">Leave Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 550 }}
          eventPropGetter={eventStyleGetter} // Applies the custom colors
          views={["month", "week", "day"]} // Allowed views
          view={currentView} // Controlled view
          date={currentDate} // Controlled date
          onNavigate={handleNavigate} // Navigation handler
          onView={handleViewChange} // View change handler
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {isModalOpen && selectedLeave && (
        <Modal
          size={"2xl"}
          heading={"Employee Leave Request Details"}
          desc={"Check below the details of this employee request"}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedLeave(null);
          }}
          showSubmitBtn={false}
        >
          <LeaveDetails initialValues={selectedLeave} />
        </Modal>
      )}
    </>
  );
};

export default LeaveCalendar;
