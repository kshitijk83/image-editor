"use client";

import React, { createContext, useContext, useRef } from "react";
import fabric from "@/fabric";

// Create the context with a default value
const FabricContext = createContext<{
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  fabricRef: React.MutableRefObject<fabric.Canvas>;
}>({
  canvasRef: null,
  fabricRef: null,
});

export const FabricProvider: React.FC<any> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas>(null);

  return (
    <FabricContext.Provider value={{ canvasRef, fabricRef }}>
      {children}
    </FabricContext.Provider>
  );
};

export const useFabricRef = () => {
  const context = useContext(FabricContext);
  if (!context) {
    throw new Error("useFabricRef must be used within a FabricProvider");
  }
  return { canvasRef: context.canvasRef, fabricRef: context.fabricRef };
};
