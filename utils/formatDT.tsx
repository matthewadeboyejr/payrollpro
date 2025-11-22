export const formatDT = (dataString: string) => {
  if (!dataString || isNaN(new Date(dataString).getTime())) {
    console.error("Invalid date string:", dataString);
    return { date: "", time: "", formattedTime: "", age: null };
  }

  const dateObj = new Date(dataString);

  const date = dateObj.toISOString().split("T")[0];
  const time = dateObj.toTimeString().split(" ")[0];
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = dateObj.toLocaleTimeString("en-US", options);

  const currentYear = new Date().getFullYear();
  const age = currentYear - dateObj.getFullYear();

  return { date, time, formattedTime, age };
};
