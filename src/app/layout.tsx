import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';

const karla = Karla({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taskfy ',
  description: ' sistema de tarefas e projetos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={karla.className}>{children}</body>
    </html>
  );
}
