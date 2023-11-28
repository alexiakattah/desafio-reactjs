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
  tasks: string[];
}
interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  project: string;
  tags: string[];
}

export const ProjectContext = createContext({} as ProjectContextType);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [project, setProject] = useState<ProjectType[]>([]);

  useEffect(() => {
    fetch('/api/project')
      .then((res) => {
        return res.json();
      })
      .then((data) => setProject(data.res))
      .catch(() => {
        setProject([
          {
            id: '1',
            title: 'Project 1',
            description: 'Project 1 description',
            tasks: ['4', '5', '6'],
          },
          {
            id: '2',
            title: 'Project 2',
            description: 'Project 2 description',
            tasks: ['1', '2', '3'],
          },
        ]);
      });
  }, []);

  useEffect(() => {
    fetch('/api/task')
      .then((res) => {
        return res.json();
      })
      .then((data) => setTasks(data.res))
      .catch(() => {
        setTasks([
          {
            id: '1',
            title: 'Task 1',
            description: 'Task 1 description',
            status: 'todo',
            createdAt: '2021-08-01',
            project: '2',
            tags: ['1', '2'],
          },
          {
            id: '2',
            title: 'Task 2',
            description: 'Task 2 description',
            status: 'todo',
            createdAt: '2021-08-01',
            project: '2',
            tags: ['1', '2'],
          },
          {
            id: '3',
            title: 'Task 3',
            description: 'Task 3 description',
            status: 'todo',
            createdAt: '2021-08-01',
            project: '2',
            tags: ['1', '2'],
          },
          {
            id: '4',
            title: 'Task 4',
            description: 'Task 4 description',
            status: 'todo',
            createdAt: '2021-08-01',
            project: '1',
            tags: ['1', '2'],
          },
          {
            id: '5',
            title: 'Task 5',
            description: 'Task 5 description',
            status: 'todo',
            createdAt: '2021-08-01',
            project: '1',
            tags: ['1', '2'],
          },
          {
            id: '6',
            title: 'Task 6',
            description: 'Task 6 description',
            status: 'todo',
            createdAt: '2021-08-01',
            project: '1',
            tags: ['1', '2'],
          },
        ]);
      });
  }, []);

  return (
    <ProjectContext.Provider value={{ project, setProject, setTasks, tasks }}>
      {children}
    </ProjectContext.Provider>
  );
}
