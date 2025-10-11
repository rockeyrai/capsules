"use client"; // if using Next.js 13 app router

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const TestPage = () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div style={{ padding: 20, position: "relative" }}>
      {/* Dropdown button */}
      <div
        onClick={toggleDropdown}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: 120,
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: 50,
          cursor: "pointer",
          userSelect: "none",
          backgroundColor: "#fff",
        }}
      >
        <span>{selected}</span>
        <ChevronDown size={18} />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div
          style={{
            marginTop: 4,
            border: "1px solid #ccc",
            borderRadius: 6,
            width: 120,
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            position: "absolute",
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestPage;
