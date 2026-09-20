import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AMINE JHILEL - 2D Platformer Game',
  description: 'An action-packed 2D side-scrolling platformer starring Neo on an epic quest through 5 worlds to defeat Drako!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="antialiased bg-slate-950 text-white select-none overflow-hidden touch-none">
        {children}
      </body>
    </html>
  );
}
