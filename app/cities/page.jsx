import { redirect } from 'next/navigation';

export default function CitiesPage() {
  // City routes are temporarily redirected until multiple cities are ready for publication.
  redirect('/explore');
}
