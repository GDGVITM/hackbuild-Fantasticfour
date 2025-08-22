'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import auth from '../../../lib/auth';

type Role = 'student' | 'teacher' | null;

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // initial load: username, stored role/profile
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await auth.getStoredUsername();
        const storedRole = await auth.storageGet?.('role');
        const storedProfile = await auth.storageGet?.('profile');
        if (!mounted) return;
        setUsername(u || '');
        setProfile(storedProfile || null);
        // do not overwrite role here; URL has priority and will be handled in separate effect
        if (!storedRole) {
          // leave role null for now
        }
      } catch (err) {
        console.error('Failed to read auth/profile from storage', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // react to URL query param -> role. URL takes precedence over stored value.
  useEffect(() => {
    const roleParam = searchParams?.get('role');
    (async () => {
      if (roleParam === 'student' || roleParam === 'teacher') {
        // update storage and local state
        await auth.storageSet?.('role', roleParam);
        setRole(roleParam);
        const p = await auth.storageGet?.('profile');
        if (p) setProfile(p);
        else {
          // create minimal mock profile like before
          if (roleParam === 'student') {
            const sample = {
              id: 'S' + Math.floor(10000 + Math.random() * 90000).toString(),
              course: 'B.Tech - Computer Science',
              year: '2nd Year',
              gpa: 8.3,
              courses: [
                { code: 'CS201', name: 'Data Structures' },
                { code: 'CS202', name: 'Algorithms' },
                { code: 'CS203', name: 'Operating Systems' },
              ],
            };
            await auth.storageSet?.('profile', sample);
            setProfile(sample);
          } else {
            const sample = {
              department: 'Computer Science',
              designation: 'Assistant Professor',
              office: 'Block B, Room 214',
              classes: [
                { id: '1', subject: 'Advanced Mathematics', className: '12-A', time: '9:00 AM', studentCount: 28 },
                { id: '2', subject: 'Calculus', className: '12-B', time: '1:00 PM', studentCount: 30 },
              ],
              contact: 'teacher@example.edu'
            };
            await auth.storageSet?.('profile', sample);
            setProfile(sample);
          }
        }
        return;
      }

      // no valid role param -> try stored role
      const storedRole = await auth.storageGet?.('role');
      if (storedRole === 'student' || storedRole === 'teacher') {
        setRole(storedRole);
        const p = await auth.storageGet?.('profile');
        setProfile(p || null);
        return;
      }

      // neither URL nor stored role
      setRole(null);
      setProfile(null);
    })();
  }, [searchParams]);

  const handleLogout = async () => {
    await auth.clearAuth();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf6f9] p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006d77] mx-auto mb-3"></div>
          <p className="text-sm text-gray-700">Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf6f9] p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-5 text-gray-700">
        <header className="flex items-center space-x-3">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#e29578' }}>
            {username ? username.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">{username || 'Unknown User'}</h1>
            <p className="text-xs truncate">{role ? (role === 'student' ? 'Student' : 'Teacher') : 'No role specified'}</p>
          </div>
          <div className="flex-shrink-0">
            <button onClick={handleLogout} className="text-xs px-3 py-2 bg-[#006d77] text-white rounded-lg">Logout</button>
          </div>
        </header>

        <main className="mt-4 space-y-4">
          {/* Signed-in info (token removed) */}
          <section className="bg-[#f8fafc] p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs">Signed in as</p>
                <p className="text-sm font-medium">{username || '—'}</p>
              </div>
              <div className="text-right">
                {/* token removed intentionally */}
              </div>
            </div>
          </section>

          {/* Role driven content or hint if missing */}
          {role ? (
            role === 'student' ? (
              <StudentView profile={profile} />
            ) : (
              <TeacherView profile={profile} />
            )
          ) : (
            <div className="p-3 rounded-lg bg-white border border-gray-100 text-sm">
              No role specified. Open this page with a role query param, for example:
              <div className="mt-2 flex flex-col sm:flex-row sm:space-x-2 gap-2">
                <Link href="/dashboard/profile?role=student" className="px-3 py-2 rounded-lg bg-[#83c5be] text-white text-center">/profile?role=student</Link>
                <Link href="/dashboard/profile?role=teacher" className="px-3 py-2 rounded-lg bg-[#e29578] text-white text-center">/profile?role=teacher</Link>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:space-x-3 gap-3">
            <Link href="/dashboard" className="w-full text-center px-4 py-3 rounded-lg bg-white border border-gray-200">Back</Link>
            {/* Switch role button removed as requested */}
          </div>
        </main>

      </div>
    </div>
  );
}

function StudentView({ profile }: { profile: any }) {
  const p = profile || {};
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Student Profile</h2>
          <p className="text-xs">{p.course || 'Course not set'} • {p.year || 'Year not set'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{p.id || '—'}</p>
          <p className="text-xs">Student ID</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs">GPA</p>
            <p className="text-lg font-semibold">{p.gpa ?? '—'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs">Courses</p>
            <p className="text-sm font-medium">{(p.courses || []).length} enrolled</p>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          {(p.courses || []).slice(0, 4).map((c: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{c.code} — {c.name}</p>
              </div>
              <div className="text-xs ml-3">View</div>
            </div>
          ))}
          {(p.courses || []).length === 0 && (
            <p className="text-xs">No courses found</p>
          )}
        </div>
      </div>

      <details className="bg-white border border-gray-100 p-3 rounded-lg">
        <summary className="text-sm font-medium">Academic details</summary>
        <div className="mt-2 text-sm space-y-2">
          <div>Attendance: {p.attendance ?? '—'}</div>
          <div>Completed Credits: {p.credits ?? '—'}</div>
          <div>Advisor: {p.advisor ?? '—'}</div>
        </div>
      </details>
    </section>
  );
}

function TeacherView({ profile }: { profile: any }) {
  const p = profile || {};
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Teacher Profile</h2>
          <p className="text-xs">{p.designation || '—'} • {p.department || 'Department not set'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{p.contact || '—'}</p>
          <p className="text-xs">Contact</p>
        </div>
      </div>

      <div className="space-y-2">
        {(p.classes || []).map((c: any, idx: number) => (
          <div key={idx} className="bg-white border border-gray-100 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{c.subject}</p>
                <p className="text-xs">{c.className} • {c.time}</p>
              </div>
              <div className="text-xs">Students: {c.studentCount ?? '—'}</div>
            </div>
          </div>
        ))}
        {(p.classes || []).length === 0 && (
          <div className="bg-white border border-gray-100 p-3 rounded-lg text-sm">No classes assigned</div>
        )}
      </div>

      <details className="bg-white border border-gray-100 p-3 rounded-lg">
        <summary className="text-sm font-medium">Office & other details</summary>
        <div className="mt-2 text-sm space-y-2">
          <div>Office: {p.office ?? '—'}</div>
          <div>Office hours: {p.officeHours ?? '—'}</div>
        </div>
      </details>
    </section>
  );
}
