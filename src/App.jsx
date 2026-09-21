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

function AppContent() {
  // Navigation State
  const [activePage, setActivePage] = useState(() => {
    // Check if initial URL is a published site e.g. /s/:slug
    const path = window.location.pathname;
    if (path.startsWith("/s/")) {
      return "published";
    }
    return "landing";
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
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToPublished = (slug) => {
    setPublishedSlug(slug);
    setActivePage("published");
    window.history.pushState({}, "", `/s/${slug}`);
  };

  const navigateToHome = () => {
    setActivePage("landing");
    window.history.pushState({}, "", "/");
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
          setActivePage={(page) => {
            setActivePage(page);
            if (window.location.pathname.startsWith("/s/")) {
              window.history.pushState({}, "", "/");
            }
          }}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}

      {/* Main Pages Switcher */}
      <main style={{ flex: 1 }}>
        {activePage === "landing" && (
          <LandingPage
            setActivePage={setActivePage}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSelectTemplate={(tplId) => setWizardTemplateId(tplId)}
          />
        )}

        {activePage === "dashboard" && (
          <DashboardPage
            setActivePage={setActivePage}
            onOpenPublish={(proj) => setPublishModalProject(proj)}
            onOpenShare={(slug) => setShareModalSlug(slug)}
            onOpenAnalytics={(proj) => setAnalyticsModalProject(proj)}
          />
        )}

        {activePage === "project-wizard" && (
          <ProjectWizardPage
            setActivePage={setActivePage}
            selectedTemplateId={wizardTemplateId}
          />
        )}

        {activePage === "builder" && (
          <WebsiteBuilderPage
            setActivePage={setActivePage}
            onOpenPublish={(proj) => setPublishModalProject(proj)}
            onOpenShare={(slug) => setShareModalSlug(slug)}
            onOpenAnalytics={(proj) => setAnalyticsModalProject(proj)}
          />
        )}

        {activePage === "memories" && (
          <MemoryLibraryPage setActivePage={setActivePage} />
        )}

        {activePage === "important-dates" && (
          <ImportantDatesPage setActivePage={setActivePage} />
        )}

        {activePage === "templates" && (
          <TemplatesPage
            setActivePage={setActivePage}
            onSelectTemplate={(tplId) => setWizardTemplateId(tplId)}
          />
        )}

        {activePage === "billing" && (
          <BillingPage setActivePage={setActivePage} />
        )}

        {activePage === "settings" && (
          <SettingsPage setActivePage={setActivePage} />
        )}

        {activePage === "admin" && (
          <AdminPage setActivePage={setActivePage} />
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
        <Footer setActivePage={setActivePage} />
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
