import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import PortalHome from "./pages/PortalHome";
import Login from "./pages/Login";
import MaterialRequest from "./pages/MaterialRequest";
import Library from "./pages/Library";
import CarouselLibrary from "./pages/CarouselLibrary";
import SoftwareApplication from "./pages/SoftwareApplication";
import ProjectManagement from "./pages/ProjectManagement";
import Dictionary from "./pages/Dictionary";
import DictionaryManagement from "./pages/DictionaryManagement";
import CaseDesignTracker from "./pages/CaseDesignTracker";
import MediaGallery from "./pages/MediaGallery";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import EducationNdx from "./pages/EducationNdx";
import ContentManagement from "./pages/ContentManagement";
import UserPermissions from "./pages/UserPermissions";

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
              <Route path="/portal" element={<PortalHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/material-request" element={<MaterialRequest />} />
              <Route path="/education" element={<Education />} />
              <Route path="/education-ndx" element={<EducationNdx />} />
              <Route path="/library" element={<Library />} />
              <Route path="/library/carousel" element={<CarouselLibrary />} />
              <Route path="/software-application" element={<SoftwareApplication />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/dictionary-management" element={<DictionaryManagement />} />
              <Route path="/case-design-tracker" element={<CaseDesignTracker />} />
              <Route path="/media-gallery" element={<MediaGallery />} />
              <Route path="/mis/project-management" element={<ProjectManagement />} />
              <Route path="/content-management" element={<ContentManagement />} />
              <Route path="/user-permissions" element={<UserPermissions />} />
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
