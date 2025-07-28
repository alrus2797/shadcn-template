import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <main>
        <div className="p-4">
          <Button onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Menu className="mr-2" />
            Toggle Sidebar
          </Button>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}