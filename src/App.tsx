import { MainContainer } from "./components/MainContainer";
import { ThemeProvider } from "@/components/ui/theme-provider";

// import HomeBackground from "./components/HomeBackground";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainContainer />
    </ThemeProvider>
  );
}

export default App;
