import React, { useState } from "react";
import "./UploadImageButton.css";

const UploadImageButton = ({ onChange }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onChange) {
        onChange(file);
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label
        htmlFor="upload"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {fileName || "Upload File"}
      </label>
      <input
        id="upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImageButton;
