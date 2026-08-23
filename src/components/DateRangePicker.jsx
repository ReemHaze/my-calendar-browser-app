import { useState } from "react";
import "./DateRangePicker.css";

const presets = [
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "Last 365 days",
  "Custom",
];

function DateRangePicker() {
  const [activePreset, setActivePreset] = useState("Last 30 days");

  // Starting month shown in the design
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 6, 1)
  );

  const [startDate, setStartDate] = useState(
    new Date(2026, 6, 25)
  );

  const [endDate, setEndDate] = useState(
    new Date(2026, 6, 31)
  );

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const days = [];

  // Previous month days
  const previousMonthDays = new Date(
    year,
    month,
    0
  ).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: previousMonthDays - i,
      currentMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      currentMonth: true,
    });
  }

  // Next month days
  let nextDay = 1;

  while (days.length < 42) {
    days.push({
      day: nextDay,
      currentMonth: false,
    });

    nextDay++;
  }

  const changeMonth = (amount) => {
    setCurrentDate(
      new Date(year, month + amount, 1)
    );
  };

  const handlePreset = (preset) => {
    setActivePreset(preset);

    const today = new Date();

    if (preset === "Today") {
      setStartDate(today);
      setEndDate(today);
    }

    if (preset === "Last 7 days") {
      const start = new Date(today);
      start.setDate(today.getDate() - 6);

      setStartDate(start);
      setEndDate(today);
    }

    if (preset === "Last 30 days") {
      const start = new Date(today);
      start.setDate(today.getDate() - 29);

      setStartDate(start);
      setEndDate(today);
    }

    if (preset === "Last 90 days") {
      const start = new Date(today);
      start.setDate(today.getDate() - 89);

      setStartDate(start);
      setEndDate(today);
    }

    if (preset === "Last 365 days") {
      const start = new Date(today);
      start.setDate(today.getDate() - 364);

      setStartDate(start);
      setEndDate(today);
    }

    if (preset === "Custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleDayClick = (item) => {
    if (!item.currentMonth) return;

    const selectedDate = new Date(
      year,
      month,
      item.day
    );

    setActivePreset("Custom");

    if (!startDate || endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate < startDate) {
      setEndDate(startDate);
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
  };

  const isStartDate = (item) => {
    if (!item.currentMonth || !startDate) return false;

    return (
      item.day === startDate.getDate() &&
      month === startDate.getMonth() &&
      year === startDate.getFullYear()
    );
  };

  const isEndDate = (item) => {
    if (!item.currentMonth || !endDate) return false;

    return (
      item.day === endDate.getDate() &&
      month === endDate.getMonth() &&
      year === endDate.getFullYear()
    );
  };

  const isInRange = (item) => {
    if (!item.currentMonth || !startDate || !endDate) {
      return false;
    }

    const date = new Date(
      year,
      month,
      item.day
    );

    return date > startDate && date < endDate;
  };

  return (
    <div className="date-picker">

      {/* LEFT SIDE */}
      <div className="presets">
        {presets.map((preset) => (
          <button
            key={preset}
            className={
              activePreset === preset
                ? "preset active"
                : "preset"
            }
            onClick={() => handlePreset(preset)}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="calendar">

        {/* MONTH HEADER */}
        <div className="calendar-header">

          <button
            className="month-arrow"
            onClick={() => changeMonth(-1)}
          >
            ‹
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button
            className="month-arrow"
            onClick={() => changeMonth(1)}
          >
            ›
          </button>

        </div>

        {/* WEEK DAYS */}
        <div className="weekdays">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* DAYS */}
        <div className="days">

          {days.map((item, index) => {

            const start = isStartDate(item);
            const end = isEndDate(item);
            const range = isInRange(item);

            return (
              <button
                key={index}
                className={`
                  day
                  ${!item.currentMonth ? "other-month" : ""}
                  ${range ? "in-range" : ""}
                  ${start || end ? "selected" : ""}
                `}
                onClick={() => handleDayClick(item)}
              >
                {item.day}
              </button>
            );
          })}

        </div>

        {/* FOOTER */}
        <div className="actions">

          <button
            className="cancel"
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              setActivePreset("Custom");
            }}
          >
            Cancel
          </button>

          <button
            className="apply"
            disabled={!startDate || !endDate}
            onClick={() => {
              console.log({
                startDate,
                endDate,
              });
            }}
          >
            Apply
          </button>

        </div>

      </div>
    </div>
  );
}

export default DateRangePicker;