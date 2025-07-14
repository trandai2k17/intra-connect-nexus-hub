
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MaterialRequest from "./pages/MaterialRequest";
import Library from "./pages/Library";
import SoftwareApplication from "./pages/SoftwareApplication";
import ProjectManagement from "./pages/ProjectManagement";
import Dictionary from "./pages/Dictionary";
import DictionaryManagement from "./pages/DictionaryManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/material-request" element={<MaterialRequest />} />
              <Route path="/library" element={<Library />} />
              <Route path="/software-application" element={<SoftwareApplication />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/dictionary-management" element={<DictionaryManagement />} />
              <Route path="/mis/project-management" element={<ProjectManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
