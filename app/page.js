import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <>
      <div className="flex w-full">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full h-screen">
          <Topbar />
          <MainContent/>
        </div>
      </div>
    </>
  );
}
