import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>Admin Navigation</nav>
      {children}
    </section>
  );
}