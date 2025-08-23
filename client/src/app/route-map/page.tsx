import React from "react";
import Link from "next/link";

const routes: { path: string; label: string }[] = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/signup", label: "Sign Up" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/community", label: "Community" },
    { path: "/CourseRegistration", label: "Course Registration" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/ats", label: "ATS" },
    { path: "/announcements", label: "Announcements" },
    { path: "/interview-resources", label: "Interview Resources" },
    { path: "/resume-builder", label: "Resume Builder" },
    { path: "/placement", label: "Placement" },
    { path: "/parent-dashboard", label: "Parent Dashboard" },
    { path: "/mock-interview", label: "Mock Interview" },
    { path: "/route-map", label: "Route Map" },
    { path: "/quiz-creator", label: "Quiz Creator" },
    { path: "/quiz", label: "Quiz" },
    { path: "/classroom", label: "Classroom" },
    { path: "/language-settings", label: "Language Settings" },
    { path: "/timetable", label: "Timetable" },
    { path: "/parent-dashboard", label: "Parent Dashboard" }

];

const containerStyle: React.CSSProperties = {
    maxWidth: 900,
    margin: "40px auto",
    padding: 20,
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
};

const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    marginTop: 18,
};

const linkStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 14px",
    textAlign: "center" as const,
    background: "#0366d6",
    color: "white",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
};

export default function Page() {
    return (
        <main style={containerStyle}>
            <h1>Route Map</h1>
            <p>Click a button to navigate to that route.</p>

            <div style={gridStyle}>
                {routes.map(({ path, label }) => (
                    <Link key={path} href={path} style={linkStyle} aria-label={`Go to ${label}`}>
                        {label}
                    </Link>
                ))}
            </div>
        </main>
    );
}