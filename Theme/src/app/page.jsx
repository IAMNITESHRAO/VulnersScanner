// src/app/page.jsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/auth1/login');   // login route
}
