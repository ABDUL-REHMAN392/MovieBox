import { useState } from 'react';
import { useSelector } from 'react-redux';

function DayWeekToggle({ onChange }) {
  const { darkTheme } = useSelector(state => state.conditions);
  const [selected, setSelected] = useState("day");

  const handleClick = (value) => { setSelected(value); onChange(value); };

  return (
    <div className={`inline-flex p-1 rounded-full border ${
      darkTheme ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'
    }`}>
      {["day", "week"].map(value => {
        const isActive = selected === value;
        return (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#29e3ad] text-black shadow-sm'
                : darkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

export default DayWeekToggle;