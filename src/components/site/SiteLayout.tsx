import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Native scroll restoration for BrowserRouter (data routers can use <ScrollRestoration />)
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, search, hash]);

  return null;
}

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-aurora">
      <SiteHeader />
      <main className="pt-20">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}

