import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks, useUpdateTask } from "../hooks/useTasks";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const COLUMNS = [
  { id: "todo", label: "Todo" },
  { id: "inprogress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export default function KanbanBoard() {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const { mutate: updateTask } = useUpdateTask();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function handleEdit(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleAddNew() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function onDragEnd(result) {
    const { draggableId, destination } = result;
    if (!destination) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task || task.status === destination.droppableId) return;

    updateTask({ ...task, status: destination.droppableId });
  }

  if (isLoading)
    return <div className="p-6 text-gray-400">Loading tasks...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Something went wrong.</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">My Board</h1>
          <button
            onClick={handleAddNew}
            className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            + Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided) => (
                  <div
                    className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex flex-col h-[calc(100vh-160px)]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {col.label}
                      </h2>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                      {colTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} onEdit={handleEdit} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>

        {modalOpen && (
          <TaskModal task={editingTask} onClose={() => setModalOpen(false)} />
        )}
      </div>
    </DragDropContext>
  );
}
