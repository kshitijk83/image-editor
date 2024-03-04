"use client";

import CanvasBox2 from "@/components/CanvasBox2";
// import fabric from "@/fabric";
import React, { useRef, useState } from "react";

const MainArea = () => {
  const [image, setImage] = useState(null);

  const handleUploadImage = (event) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  let insideBox;
  if (!image) {
    insideBox = <input type="file" onChange={handleUploadImage} />;
  } else {
    insideBox = <CanvasBox2 image={image} />;
  }

  return (
    <div className="flex flex-col">
      <div>{insideBox}</div>
    </div>
  );
};

export default MainArea;
