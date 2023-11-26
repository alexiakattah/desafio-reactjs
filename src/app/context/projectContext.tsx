'use client';
import { ReactNode, createContext, useState } from 'react';

interface ProjectContextType {
  project: ProjectType[];
  setProject: (project: ProjectType[]) => void;
}
export interface ProjectType {
  id: string;
  name: string;
  description: string;
  tasks: TaskType[];
}
interface TaskType {
  id: string;
  name: string;
  description: string;
  status: string;
}

export const ProjectContext = createContext({} as ProjectContextType);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<ProjectType[]>([]);

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
