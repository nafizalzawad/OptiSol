import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-aurora">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="w-full rounded-2xl border bg-background/70 p-10 shadow-soft backdrop-blur">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight">This route doesn’t exist.</h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            The page you tried to access isn’t available. Head back to OptiSol and continue exploring the product.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft focus-ring"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
