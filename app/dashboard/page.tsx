import MainArea from "@/Layout/page";
import CanvasBox2 from "@/components/CanvasBox2";

export default function Home() {
  return (
    <main className="flex justify-center bg-slate-300 h-full mt-2 relative">
      <aside className="absolute left-0 top-0 w-[300px] h-full bg-white shadow-lg">
        Options
      </aside>
      <section className="w-full h-full flex justify-center items-center">
        <MainArea />
      </section>
      <aside className="absolute right-0 top-0 w-[400px] h-full bg-white shadow-lg">
        Configure parameters
      </aside>
    </main>
  );
}
