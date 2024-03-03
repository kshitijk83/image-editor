import dynamic from "next/dynamic";

const CanvasBox2 = dynamic(() => import("./CanvasBox"), { ssr: false });

export default CanvasBox2;
