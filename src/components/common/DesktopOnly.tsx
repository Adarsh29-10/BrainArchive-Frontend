import type { ReactNode } from "react";

interface DesktopOnlyProps {
  children: ReactNode;
}

function DesktopOnly({ children }: DesktopOnlyProps) {
  const isDesktop = window.innerWidth >= 1024; // lg breakpoint

  if (!isDesktop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-6">
        <div className="max-w-md text-center bg-white p-6 rounded-sm shadow-lg">
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            Version 1 is Desktop Only 
          </h1>
          <p className="text-gray-600 mb-4">
            BrainArchive currently supports desktop screens only.
            Mobile support is coming soon 
          </p>
          <p className="text-sm text-gray-400">
            Please open this site on a laptop or desktop.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default DesktopOnly;
