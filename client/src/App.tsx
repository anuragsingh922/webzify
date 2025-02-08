import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { StrictMode } from "react";
import ThemeWrapper from "./components/ThemeWrapper";
import ThemeSelector from "./pages/ThemeSelector";
import FetchData from "./components/FetchData";
import AdminPannel from "./pages/AdminPannel";

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeWrapper>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <FetchData />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/themes" element={<ThemeSelector />} />
                  <Route path="/admin" element={<AdminPannel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeWrapper>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
}

export default App;
