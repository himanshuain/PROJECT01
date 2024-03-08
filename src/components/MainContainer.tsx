/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
// import { CinemaContainer } from "./CinemaContainer";
// import { useEffect } from "react";
import { AnimeResults } from "./AnimeResults";
import { Sparkles } from "./TopLanding";
import { ScrollArea } from "./ui/scroll-area";
// import { ModeToggle } from "./mode-toggle";
// import { MaskContainer } from "./ui/svg-mask-effect";
// @ts-nocheck
export function MainContainer() {
  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     behavior: "smooth", // Add smooth scrolling behavior
  //   });
  // }, []);
  return (
    <ScrollArea className="rounded-md border max-h-full h-screen overflow-y-auto dark:bg-black">
      {/* <div className="flex flex-col h-screen dark:bg-black"> */}
      {/* <SearchBar setInput={setInput} /> */}
      <div className="flex-1 overflow-y-auto ">
        {/* <ResizablePanelGroup direction="horizontal" className="rounded-lg pt-4 px-2 h-full">
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
        </ResizablePanelGroup> */}

        {/* <ModeToggle /> */}

        {/* <div className="h-[40rem] w-full flex items-center justify-center  overflow-hidden">
          <MaskContainer
            revealText={
              <p className="max-w-4xl mx-auto text-slate-800 text-center  text-4xl font-bold">
                The first rule of MRR Club is you do not talk about MRR Club. The second rule of MRR
                Club is you DO NOT talk about MRR Club.
              </p>
            }
            className="h-[40rem] border rounded-md"
          >
            The first rule of <span className="text-red-500">MRR Club</span> is you do not talk
            about MRR Club. The second rule of MRR Club is you DO NOT talk about{" "}
            <span className="text-red-500">MRR Club</span>.
          </MaskContainer>
        </div> */}

        <Sparkles />

        <div className="flex flex-col items-center justify-center my-10 mx-4">
          <h2 className="scroll-m-20 pb-2 md:text-xl lg:text-3xl font-semibold tracking-tight first:mt-0">
            Your Anime Awaits! Search for anime with Image-Extraction!
          </h2>
          <p className="text-md text-muted-foreground">Use a screenshot, image or GIF.</p>
        </div>

        {/* <div className="bg-gradient-to-r from-blue-500 via-red-500 to-red-500 text-transparent bg-clip-text font-bold text-4xl">
          Colorful Text with Gradient
        </div> */}

        <AnimeResults />
      </div>
    </ScrollArea>
  );
}
