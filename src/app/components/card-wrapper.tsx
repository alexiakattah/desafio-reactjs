'use client';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useProject from '../hooks/projects';
import Task from './task';

export default function CardWrapper() {
  const { project, setProject, tasks, setTasks } = useProject();

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = tasks.slice();

    const sourceIndex = tasks.findIndex((task) => task.id === draggableId);

    const [removedTask] = updatedTasks.splice(sourceIndex, 1);

    const updatedRemovedTask = {
      ...removedTask,
      status: destination.droppableId.toUpperCase(),
    };
    const updateRemoveTask = await fetch(`/api/task/${updatedRemovedTask.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRemovedTask),
    });

    const destinationIndex = destination.index;

    updatedTasks.splice(destinationIndex, 0, updatedRemovedTask);

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="card-wrapper grid md:grid-cols-3 grid-cols-1  relative self-center container  md:mr-14 md:self-end text-gray-800 space-x-5 md:space-y-0 mb-16 space-y-5">
        <div className="col-span-1 ml-2 md:ml-0">
          <h1 className="mb-3">Progresso</h1>
          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className=" rounded-md "
              >
                {tasks
                  .filter((task) => task.status === 'TODO')
                  .map((task, index) => {
                    if (task.status === 'TODO')
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={`${task.id}`}
                          index={index}
                        >
                          {(providedDrag, snapshot) => (
                            <Task
                              {...task}
                              innerRef={providedDrag.innerRef}
                              draggableProps={providedDrag.draggableProps}
                              dragHandleProps={providedDrag.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      );
                  })}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="col-span-1 ms-0">
          <h1 className="mb-3">Em andamento</h1>
          <Droppable droppableId="doing">
            {(provided, snapshot) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className=" rounded-md "
              >
                {tasks.map((task, i) => {
                  if (task.status !== 'DOING') return;
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={i}
                    >
                      {(providedDrag, snapshot) => (
                        <Task
                          {...task}
                          innerRef={providedDrag.innerRef}
                          draggableProps={providedDrag.draggableProps}
                          dragHandleProps={providedDrag.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="col-span-1">
          <h1 className="mb-3">Finalizado</h1>
          <Droppable droppableId="done">
            {(provided, snapshot) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className=" rounded-md  "
              >
                {tasks.map((task, index) => {
                  if (task.status !== 'DONE') return;
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
                    >
                      {(providedDrag, snapshot) => (
                        <Task
                          {...task}
                          innerRef={providedDrag.innerRef}
                          draggableProps={providedDrag.draggableProps}
                          dragHandleProps={providedDrag.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
