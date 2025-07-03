import dayjs from "dayjs";

export const getMonthRange = (monthStr: string) => {
  const parsed = dayjs(monthStr, "MMM YYYY");

  if (!parsed.isValid()) {
    throw new Error("Invalid month format. Use format like 'Jun 2025'");
  }

  const startOfMonth = parsed.startOf("month").format("YYYY-MM-DD");
  const endOfMonth = parsed.endOf("month").format("YYYY-MM-DD");

  return {
    start: startOfMonth,
    end: endOfMonth,
  };
};
