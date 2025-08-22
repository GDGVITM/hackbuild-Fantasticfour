"use client";
import TranslateProvider from "./TraslationProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <TranslateProvider>
      <div className="flex min-h-screen w-full bg-white dark:bg-gray-900 overflow-hidden p-0 m-0">
        <main className="flex-1 h-screen overflow-auto p-0 m-0">
          <div className="h-full w-full">
            {children}
          </div>
        </main>
      </div>
    </TranslateProvider>
  );
}