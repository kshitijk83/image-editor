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
    <main className="flex justify-center bg-slate-300 h-full relative">
      <aside className="absolute left-0 top-0 w-[300px] h-full bg-white shadow-lg flex-col flex">
        <Suspense fallback={"Loading..."}>
          <Options />
        </Suspense>
      </aside>
      <section className="w-full h-full flex justify-center items-center">
        <MainArea />
      </section>
      <aside className="absolute right-0 top-0 w-[400px] h-full bg-white shadow-lg">
        <ConfigParams />
      </aside>
    </main>
  );
}
