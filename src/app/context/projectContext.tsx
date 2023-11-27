'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface ProjectContextType {
  project: ProjectType[];
  setProject: (project: ProjectType[]) => void;
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
}
export interface ProjectType {
  id: string;
  title: string;
  description: string;
  tasks: TaskType[];
}
interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
}

export const ProjectContext = createContext({} as ProjectContextType);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [project, setProject] = useState<ProjectType[]>([]);
  console.log(
    '🚀 ~ file: projectContext.tsx:30 ~ ProjectProvider ~ project:',
    project,
  );

  useEffect(() => {
    fetch('/api/project')
      .then((res) => {
        return res.json();
      })
      .then((data) => setProject(data.res));
  }, []);

  useEffect(() => {
    fetch('/api/task')
      .then((res) => {
        return res.json();
      })
      .then((data) => setTasks(data.res));
  }, []);

  return (
    <ProjectContext.Provider value={{ project, setProject, setTasks, tasks }}>
      {children}
    </ProjectContext.Provider>
  );
}
