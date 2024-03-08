"use client";

import CanvasBox2 from "@/components/CanvasBox2";
import dynamic from "next/dynamic";
// import fabric from "@/fabric";
import React, { useRef, useState } from "react";

const CanvasBox = dynamic(() => import("./CanvasBox"), {
  ssr: false,
});

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
    insideBox = (
      <input
        type="file"
        onChange={handleUploadImage}
        accept="image/*, image/svg+xml"
      />
    );
  } else {
    insideBox = <CanvasBox image={image} />;
  }

  return (
    <div className="absolute top-[20%] right-[10%] origin-center">
      {insideBox}
    </div>
  );
};

export default MainArea;
