import { useState } from "react";

interface Props {
  onNumberSelect?: (number: number) => void;
  headerText?: string;
}

const TitleFilterHeader: React.FC<Props> = ({ onNumberSelect, headerText }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (onNumberSelect && inputValue) {
      const num = parseInt(inputValue);
      if (!isNaN(num) && num > 0) {
        onNumberSelect(num);
      }
    }
    setInputValue("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-black mr-1"
        >
          <i className="pi pi-chevron-down text-xs" />
        </button>
        {headerText && <span>{headerText}</span>}
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow p-2 z-50 w-48">
          <p className="text-sm font-medium mb-1">Select rows</p>
          <input
            type="text"
            placeholder="Enter number"
            className="border px-2 py-1 text-sm rounded w-full mb-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default TitleFilterHeader;