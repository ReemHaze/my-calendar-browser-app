import React, { useState } from "react";
import "./DateRangePicker.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [appliedRange, setAppliedRange] = useState({
    start: null,
    end: null,
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // Previous month
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Select a day
  const handleDayClick = (day) => {
    const selected = new Date(year, month, day);

    // First click
    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
    }

    // Second click
    else if (selected >= startDate) {
      setEndDate(selected);
    }

    // If second date is before start date
    else {
      setStartDate(selected);
      setEndDate(null);
    }
  };

  // Check if day is start or end date
  const isSelected = (day) => {
    const date = new Date(year, month, day);

    return (
      (startDate &&
        date.getTime() === startDate.getTime()) ||
      (endDate &&
        date.getTime() === endDate.getTime())
    );
  };

  // Check if day is inside selected range
  const isInRange = (day) => {
    if (!startDate || !endDate) {
      return false;
    }

    const date = new Date(year, month, day);

    return date > startDate && date < endDate;
  };

  // Preset dates
  const setPreset = (days) => {
    const today = new Date();
    const start = new Date(today);

    start.setDate(today.getDate() - (days - 1));

    setStartDate(start);
    setEndDate(today);
    setCurrentDate(new Date(today));
  };

  // Today
  const handleToday = () => {
    const today = new Date();

    setStartDate(today);
    setEndDate(today);
    setCurrentDate(today);
  };

  // Custom
  const handleCustom = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // Cancel
  const cancel = () => {
    setStartDate(null);
    setEndDate(null);

    setAppliedRange({
      start: null,
      end: null,
    });
  };

  // Apply
  const apply = () => {
    if (!startDate || !endDate) {
      return;
    }

    setAppliedRange({
      start: startDate,
      end: endDate,
    });
  };

  return (
    <div className="date-picker">

      {/* Presets */}
      <div className="presets">

        <button onClick={handleToday}>
          Today
        </button>

        <button onClick={() => setPreset(7)}>
          Last 7 days
        </button>

        <button onClick={() => setPreset(30)}>
          Last 30 days
        </button>

        <button onClick={() => setPreset(90)}>
          Last 90 days
        </button>

        <button onClick={() => setPreset(365)}>
          Last 365 days
        </button>

        <button
          className="custom-button"
          onClick={handleCustom}
        >
          Custom
        </button>

      </div>

      {/* Calendar */}
      <div className="calendar">

        {/* Calendar Header */}
        <div className="calendar-header">

          <button onClick={previousMonth}>
            ←
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button onClick={nextMonth}>
            →
          </button>

        </div>

        {/* Weekdays */}
        <div className="weekdays">

          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>

        </div>

        {/* Days */}
        <div className="days">

          {/* Empty spaces before first day */}
          {Array.from({ length: firstDay }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                className="empty-day"
              />
            )
          )}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map(
            (_, index) => {

              const day = index + 1;

              return (
                <button
                  key={day}
                  className={`
                    day
                    ${isSelected(day) ? "selected" : ""}
                    ${isInRange(day) ? "in-range" : ""}
                  `}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              );
            }
          )}

        </div>

      </div>

      {/* Selected Range */}
      <div className="range-info">

        <div>
          <span>Start date</span>

          <strong>
            {startDate
              ? startDate.toLocaleDateString()
              : "Select date"}
          </strong>
        </div>

        <div>
          <span>End date</span>

          <strong>
            {endDate
              ? endDate.toLocaleDateString()
              : "Select date"}
          </strong>
        </div>

      </div>

      {/* Actions */}
      <div className="actions">

        <button onClick={cancel}>
          Cancel
        </button>

        <button
          className="apply"
          onClick={apply}
          disabled={!startDate || !endDate}
        >
          Apply
        </button>

      </div>

      {/* Applied Range */}
      {appliedRange.start && appliedRange.end && (
        <div className="applied-range">

          Selected range:{" "}

          {appliedRange.start.toLocaleDateString()}

          {" - "}

          {appliedRange.end.toLocaleDateString()}

        </div>
      )}

    </div>
  );
};

export default DateRangePicker;