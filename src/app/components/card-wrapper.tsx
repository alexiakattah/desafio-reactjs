' use client';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useProject from '../hooks/projects';

export default function CardWrapper() {
  const { project, setProject, tasks } = useProject();
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    console.log('🚀 ~ file: card-wrapper.tsx:9 ~ onDragEnd ~ result:', result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = project[source.droppableId];
    const finish = project[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.id);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setProject({
        ...project,
        [newColumn.id]: newColumn,
      });

      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.id);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.id);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setProject({
      ...project,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 md:pl-28 relative  container mr-10 w-[80%] self-end text-gray-800 space-x-3">
        <div className="col-span-1">
          <h1>Progresso</h1>
          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-50 rounded-md p-2"
              >
                {tasks
                  .filter((task) => task.status === 'TODO')
                  .map((task, index) => {
                    if (task.status === 'TODO')
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(providedDrag, snapshot) => (
                            <li
                              ref={providedDrag.innerRef}
                              {...providedDrag.draggableProps}
                              {...providedDrag.dragHandleProps}
                              className="bg-white rounded-md p-2 mb-2"
                            >
                              <div>
                                <h1 className="font-medium">{task.name}</h1>
                                <p className="text-sm">{task.description}</p>

                                <div className="flex space-x-2">
                                  {task.tags.map((tag, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="bg-gray-200 px-2 rounded"
                                      >
                                        {tag}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                  })}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="col-span-1">
          <h1>Em andamento</h1>
          <Droppable droppableId="doing">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-50 rounded-md p-2"
              >
                {tasks.map((task, i) => {
                  if (task.status !== 'DOING') return;
                  return (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(providedDrag, snapshot) => (
                        <li
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                          {...providedDrag.dragHandleProps}
                          className="bg-white rounded-md p-2 mb-2"
                        >
                          <h1 className="font-medium">{task.name}</h1>
                          <p className="text-sm">{task.description}</p>
                          <div className="flex space-x-2">
                            {task.tags.map((tag, index) => {
                              return (
                                <span
                                  key={index}
                                  className="bg-gray-200 px-2 rounded"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </div>
        <div className="col-span-1">
          <h1>Finalizado</h1>
          <Droppable droppableId="done">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-50 rounded-md p-2"
              >
                {tasks.map((task, index) => {
                  if (task.status !== 'DONE') return;
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(providedDrag, snapshot) => (
                        <li
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                          {...providedDrag.dragHandleProps}
                          className="bg-white rounded-md p-2 mb-2"
                        >
                          <h1 className="font-medium">{task.name}</h1>
                          <p className="text-sm">{task.description}</p>
                          <div className="flex space-x-2">
                            {task.tags.map((tag, index) => {
                              return (
                                <span
                                  key={index}
                                  className="bg-gray-200 px-2 rounded"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
