import { Suspense } from 'react';
import AnnouncementsClient from './AnnouncementsClient'; // Assuming your component is in this file

export default function AnnouncementsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading announcements...</div>}>
      <AnnouncementsClient />
    </Suspense>
  );
}