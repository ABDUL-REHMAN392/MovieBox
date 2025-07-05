import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function DayWeekToggle({ onChange }) {
 const { darkTheme } = useSelector(state => state.conditions);
  const [selected, setSelected] = useState("day"); // Default selected = "day"

  const activeColor = "#29e3ad"; // Selected button background
  const darkBg = "#1f1f1f";      // Dark theme parent background
  const lightBg = "#ffffff";     // Light theme parent background
  const textColor = darkTheme ? "white" : "black";

  const handleClick = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div
      className="inline-flex p-1 rounded-full border"
      style={{
        backgroundColor: darkTheme ? darkBg : lightBg,
        border: `1px solid ${activeColor}`,
      }}
    >
      {["day", "week"].map((value) => {
        const isActive = selected === value;
        return (
          <button
            key={value}
            className="px-5 cursor-pointer py-2 rounded-full font-medium transition-all duration-300"
            style={{
              backgroundColor: isActive ? activeColor : "transparent",
              color: isActive ? "black" : textColor,
            }}
            onClick={() => handleClick(value)}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

export default DayWeekToggle;
