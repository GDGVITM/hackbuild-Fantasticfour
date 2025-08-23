import AttendanceClient from "./AttendanceClient";
import { Suspense } from "react";

export default function AttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#edf6f9] p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006d77] mx-auto mb-3"></div>
            <p className="text-sm text-gray-700">Loading attendance…</p>
          </div>
        </div>
      }
    >
      <AttendanceClient />
    </Suspense>
  );
}