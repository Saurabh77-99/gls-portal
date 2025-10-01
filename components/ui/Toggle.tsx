import { useState } from "react";

const Toggle = ({ options, onToggle }: { options: { name: string; value: string }[], onToggle: (value: string) => void }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onToggle(value);
  }

  return (
    <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
            selectedValue === option.value
              ? 'bg-white text-slate-800 shadow-sm'
              : 'bg-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default Toggle