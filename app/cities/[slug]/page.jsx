import { redirect } from 'next/navigation';

export default function CityPage() {
  // City routes are temporarily redirected until multiple cities are ready for publication.
  redirect('/explore');
}
