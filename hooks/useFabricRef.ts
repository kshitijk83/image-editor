"use client";

import React, { createContext, useContext, useRef } from "react";

const FabricContext = createContext<any>(null);

const FabricConsumer = ({ children }) => {
  return <FabricContext.Provider>{children}</FabricContext.Provider>;
};

const useFabricRef = ({ width, height }) => {
  const canvasRef = useContext(FabricContext);
  return canvasRef;
};
