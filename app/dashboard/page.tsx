import MainArea from "@/Layout/MainArea";
// import CanvasBox2 from "@/components/CanvasBox2";
import { FEATURES } from "@/lib/constant";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Options = dynamic(() => import("@/components/Options"), { ssr: false });
const ConfigParams = dynamic(() => import("@/Layout/ConfigParams"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex justify-center h-full relative">
      <aside className="absolute left-0 top-0 w-[60px] h-full bg-white shadow-lg flex-col flex">
        <Suspense fallback={"Loading..."}>
          <Options />
        </Suspense>
      </aside>
      <aside className="absolute right-0 top-0 w-[400px] z-[1] h-full bg-white shadow-lg">
        <ConfigParams />
      </aside>
      <section className="w-full h-full bg-slate-300 flex pl-[170px] items-center">
        <MainArea />
      </section>
    </main>
  );
}
