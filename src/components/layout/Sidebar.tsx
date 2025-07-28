import { Home, Settings } from "lucide-react";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`transition-all duration-300 bg-gray-100 h-screen p-4 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <nav className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Home size={20} />
          <span>Home</span>
        </div>
        <div  className="flex items-center gap-2">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </nav>
    </aside>
  );
}