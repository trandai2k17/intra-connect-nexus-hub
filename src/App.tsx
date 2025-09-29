import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DashboardLayout, FullPageLayout, HeaderOnlyLayout } from "@/components/layout/Layout";
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
import TVDisplay from "./pages/TVDisplay";
import TVBonusSummary from "./pages/TVBonusSummary";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import EducationNdx from "./pages/EducationNdx";
import ContentManagement from "./pages/ContentManagement";
import ContentDashboard from "./pages/ContentDashboard";
import ContentView from "./pages/ContentView";
import UserPermissions from "./pages/UserPermissions";
import TrainingCenter from "./pages/TrainingCenter";
import NewsCenter from "./pages/news/NewsCenter";
import NewsAnnouncements from "./pages/news/NewsAnnouncements";
import NewsArticles from "./pages/news/NewsArticles";
import NewsNotifications from "./pages/news/NewsNotifications";
import NewsEvents from "./pages/news/NewsEvents";
import NewsPolicies from "./pages/news/NewsPolicies";
import { DocumentViewer } from "./pages/DocumentViewer";
import DictionaryRPD from "./pages/training/DictionaryRPD";
import DictionaryNG from "./pages/training/DictionaryNG";
import QuizCenter from "./pages/training/QuizCenter";
import ThankCorner from "./pages/training/ThankCorner";

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
              {/* Dashboard pages with full layout */}
              <Route path="/" element={<DashboardLayout><Index /></DashboardLayout>} />
              <Route path="/portal" element={<DashboardLayout><PortalHome /></DashboardLayout>} />
              <Route path="/library" element={<DashboardLayout><Library /></DashboardLayout>} />
              <Route path="/library/carousel" element={<DashboardLayout><CarouselLibrary /></DashboardLayout>} />
              <Route path="/software-application" element={<DashboardLayout><SoftwareApplication /></DashboardLayout>} />
              <Route path="/dictionary" element={<DashboardLayout><Dictionary /></DashboardLayout>} />
              <Route path="/dictionary-management" element={<DashboardLayout><DictionaryManagement /></DashboardLayout>} />
              <Route path="/case-design-tracker" element={<DashboardLayout><CaseDesignTracker /></DashboardLayout>} />
              <Route path="/media-gallery" element={<DashboardLayout><MediaGallery /></DashboardLayout>} />
              <Route path="/mis/project-management" element={<DashboardLayout><ProjectManagement /></DashboardLayout>} />
              <Route path="/content-management" element={<DashboardLayout><ContentManagement /></DashboardLayout>} />
              <Route path="/content-dashboard" element={<DashboardLayout><ContentDashboard /></DashboardLayout>} />
              <Route path="/content/view/:id" element={<DashboardLayout><ContentView /></DashboardLayout>} />
              <Route path="/user-permissions" element={<DashboardLayout><UserPermissions /></DashboardLayout>} />
              <Route path="/training-center/dashboard" element={<DashboardLayout><TrainingCenter /></DashboardLayout>} />
              <Route path="/training/dictionary/rpd" element={<DashboardLayout><DictionaryRPD /></DashboardLayout>} />
              <Route path="/training/dictionary/ng" element={<DashboardLayout><DictionaryNG /></DashboardLayout>} />
              <Route path="/training/quiz" element={<DashboardLayout><QuizCenter /></DashboardLayout>} />
              <Route path="/training/thank-corner" element={<DashboardLayout><ThankCorner /></DashboardLayout>} />
              
              {/* News & Feed Routes */}
              <Route path="/news/center" element={<DashboardLayout><NewsCenter /></DashboardLayout>} />
              <Route path="/news/announcements" element={<DashboardLayout><NewsAnnouncements /></DashboardLayout>} />
              <Route path="/news/articles" element={<DashboardLayout><NewsArticles /></DashboardLayout>} />
              <Route path="/news/notifications" element={<DashboardLayout><NewsNotifications /></DashboardLayout>} />
              <Route path="/news/events" element={<DashboardLayout><NewsEvents /></DashboardLayout>} />
              <Route path="/news/policies" element={<DashboardLayout><NewsPolicies /></DashboardLayout>} />
              <Route path="/documents/:docId" element={<DashboardLayout><DocumentViewer /></DashboardLayout>} />
              
              {/* Header-only pages */}
              <Route path="/material-request" element={<HeaderOnlyLayout><MaterialRequest /></HeaderOnlyLayout>} />
              <Route path="/education" element={<HeaderOnlyLayout><Education /></HeaderOnlyLayout>} />
              <Route path="/education-ndx" element={<HeaderOnlyLayout><EducationNdx /></HeaderOnlyLayout>} />
              
              {/* Full page layouts (no header/sidebar) */}
              <Route path="/login" element={<FullPageLayout><Login /></FullPageLayout>} />
              <Route path="/tv-display" element={<FullPageLayout><TVDisplay /></FullPageLayout>} />
              <Route path="/tv/bonus-summary" element={<FullPageLayout><TVBonusSummary /></FullPageLayout>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<DashboardLayout><NotFound /></DashboardLayout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
