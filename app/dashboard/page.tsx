import MainArea from "@/layout/MainArea";
// import CanvasBox2 from "@/components/CanvasBox2";
import { FEATURES } from "@/lib/constant";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Options = dynamic(() => import("@/components/Options"), { ssr: false });
const ConfigParams = dynamic(() => import("@/layout/ConfigParams"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex justify-center h-full relative">
      <aside className="absolute left-0 top-0 w-[50px] z-[2] h-full bg-white shadow-lg flex">
        <Options />
        {/* <div className="w-full bg-primary-600">
          <ConfigParams />
        </div> */}
      </aside>
      <aside className="absolute top-0 left-[50px] z-[2] h-full shadow-lg">
        <ConfigParams />
      </aside>
      <section className="w-full h-full bg-slate-300 flex relative items-center z-[1] ">
        <MainArea />
      </section>
    </main>
  );
}
