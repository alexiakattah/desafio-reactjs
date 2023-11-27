'use client';
import { SnackbarProvider } from 'notistack';
import CardWrapper from './components/card-wrapper';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';
import { ProjectProvider } from './context/projectContext';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-200 ">
      <SnackbarProvider maxSnack={3} autoHideDuration={300} />
      <ProjectProvider>
        <SideBar />
        <NavBar />
        <CardWrapper />
      </ProjectProvider>
    </main>
  );
}
