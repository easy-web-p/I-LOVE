import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { AuthModal } from "./components/common/AuthModal";
import { PublishModal } from "./components/publish/PublishModal";
import { ShareModal } from "./components/publish/ShareModal";

import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectWizardPage } from "./pages/ProjectWizardPage";
import { WebsiteBuilderPage } from "./pages/WebsiteBuilderPage";
import { MemoryLibraryPage } from "./pages/MemoryLibraryPage";
import { ImportantDatesPage } from "./pages/ImportantDatesPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { BillingPage } from "./pages/BillingPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PublishedSitePage } from "./pages/PublishedSitePage";
import { AdminPage } from "./pages/AdminPage";
import { AnalyticsModal } from "./components/analytics/AnalyticsModal";

function getPageFromPath(path) {
  if (path.startsWith("/s/")) return "published";
  if (path === "/dashboard" || path === "/app/dashboard") return "dashboard";
  if (path === "/memories" || path === "/app/memories") return "memories";
  if (path === "/important-dates" || path === "/app/important-dates") return "important-dates";
  if (path === "/templates") return "templates";
  if (path === "/billing" || path === "/pricing") return "billing";
  if (path === "/settings") return "settings";
  if (path === "/admin") return "admin";
  if (path === "/projects/new" || path === "/app/websites/new") return "project-wizard";
  if (path === "/builder") return "builder";
  return "landing";
}

function AppContent() {
  // Navigation State
  const [activePage, setActivePage] = useState(() => {
    return getPageFromPath(window.location.pathname);
  });

  const [publishedSlug, setPublishedSlug] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith("/s/")) {
      return path.replace("/s/", "");
    }
    return "happy-birthday-may";
  });

  const [wizardTemplateId, setWizardTemplateId] = useState(null);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [publishModalProject, setPublishModalProject] = useState(null);
  const [shareModalSlug, setShareModalSlug] = useState(null);
  const [analyticsModalProject, setAnalyticsModalProject] = useState(null);

  // Browser History Sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/s/")) {
        setPublishedSlug(path.replace("/s/", ""));
        setActivePage("published");
      } else {
        setActivePage(getPageFromPath(path));
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (page, options = {}) => {
    setActivePage(page);
    let targetPath = "/";
    switch (page) {
      case "dashboard": targetPath = "/dashboard"; break;
      case "memories": targetPath = "/memories"; break;
      case "important-dates": targetPath = "/important-dates"; break;
      case "templates": targetPath = "/templates"; break;
      case "billing": targetPath = "/billing"; break;
      case "settings": targetPath = "/settings"; break;
      case "admin": targetPath = "/admin"; break;
      case "project-wizard": targetPath = "/projects/new"; break;
      case "builder": targetPath = "/builder"; break;
      case "published": targetPath = `/s/${options.slug || publishedSlug}`; break;
      default: targetPath = "/";
    }
    window.history.pushState({}, "", targetPath);
  };

  const navigateToPublished = (slug) => {
    setPublishedSlug(slug);
    setActivePage("published");
    window.history.pushState({}, "", `/s/${slug}`);
  };

  const navigateToHome = () => {
    navigateTo("landing");
  };

  // Condition to hide global Navbar and Footer
  const isBuilder = activePage === "builder";
  const isPublished = activePage === "published";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Global Navbar */}
      {!isPublished && (
        <Navbar
          activePage={activePage}
          setActivePage={navigateTo}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}

      {/* Main Pages Switcher */}
      <main style={{ flex: 1 }}>
        {activePage === "landing" && (
          <LandingPage
            setActivePage={navigateTo}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSelectTemplate={(tplId) => setWizardTemplateId(tplId)}
          />
        )}

        {activePage === "dashboard" && (
          <DashboardPage
            setActivePage={navigateTo}
            onOpenPublish={(proj) => setPublishModalProject(proj)}
            onOpenShare={(slug) => setShareModalSlug(slug)}
            onOpenAnalytics={(proj) => setAnalyticsModalProject(proj)}
          />
        )}

        {activePage === "project-wizard" && (
          <ProjectWizardPage
            setActivePage={navigateTo}
            selectedTemplateId={wizardTemplateId}
          />
        )}

        {activePage === "builder" && (
          <WebsiteBuilderPage
            setActivePage={navigateTo}
            onOpenPublish={(proj) => setPublishModalProject(proj)}
            onOpenShare={(slug) => setShareModalSlug(slug)}
            onOpenAnalytics={(proj) => setAnalyticsModalProject(proj)}
          />
        )}

        {activePage === "memories" && (
          <MemoryLibraryPage setActivePage={navigateTo} />
        )}

        {activePage === "important-dates" && (
          <ImportantDatesPage setActivePage={navigateTo} />
        )}

        {activePage === "templates" && (
          <TemplatesPage
            setActivePage={navigateTo}
            onSelectTemplate={(tplId) => setWizardTemplateId(tplId)}
          />
        )}

        {activePage === "billing" && (
          <BillingPage setActivePage={navigateTo} />
        )}

        {activePage === "settings" && (
          <SettingsPage setActivePage={navigateTo} />
        )}

        {activePage === "admin" && (
          <AdminPage setActivePage={navigateTo} />
        )}

        {activePage === "published" && (
          <PublishedSitePage
            slug={publishedSlug}
            onNavigateHome={navigateToHome}
          />
        )}
      </main>

      {/* Global Footer (Hidden in Builder and Published Site) */}
      {!isBuilder && !isPublished && (
        <Footer setActivePage={navigateTo} />
      )}

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <PublishModal
        isOpen={!!publishModalProject}
        onClose={() => setPublishModalProject(null)}
        project={publishModalProject}
        onPublishedSuccess={(slug) => {
          setShareModalSlug(slug);
        }}
      />

      <ShareModal
        isOpen={!!shareModalSlug}
        onClose={() => setShareModalSlug(null)}
        slug={shareModalSlug || ""}
        onViewSite={(slug) => {
          navigateToPublished(slug);
        }}
      />

      <AnalyticsModal
        isOpen={!!analyticsModalProject}
        onClose={() => setAnalyticsModalProject(null)}
        project={analyticsModalProject}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
