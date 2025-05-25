import { useEffect } from "react";

const ProcessedImageHandler = ({ originalImageUrl, onProcessed }) => {
  useEffect(() => {
    fetch("http://localhost:3001/process-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: originalImageUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        const url = `http://localhost:3001/uploads/${data.path}`;
        onProcessed(url);
      });
  }, [originalImageUrl, onProcessed]);

  return null;
};

export default ProcessedImageHandler;
