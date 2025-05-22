import React from "react"
import './UploadImageButton.css'

export default function UploadImageButton({ onImageSelect }) {
  return (
    <div className="button-container">
      <label className="upload-btn">
        Завантажити зображення
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files[0]) {
              const reader = new FileReader()
              reader.onloadend = () => onImageSelect(reader.result)
              reader.readAsDataURL(e.target.files[0])
            }
          }}
        />
      </label>
    </div>
  )
}
