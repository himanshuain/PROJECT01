/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { CinemaContainer } from "./CinemaContainer";
import { ShowColorPallette } from "./ShowColorPallette";
import { SearchBar } from "./SearchBar";
// @ts-nocheck
export function MainContainer() {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col h-screen">
      <SearchBar setInput={setInput} />
      <div className="flex-1 overflow-y-auto">
        <ResizablePanelGroup direction="horizontal" className="rounded-lg pt-4 px-2 h-full">
          <ResizablePanel defaultSize={50}>
            <CinemaContainer searchInput={input} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                  <ShowColorPallette />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
