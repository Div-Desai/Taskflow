import { useDeleteTask } from "../hooks/useTasks";

export default function TaskCard({ task }) {
  const { mutate: removeTask } = useDeleteTask();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-800 mb-1">{task.title}</h3>
      {task.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-400">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-2">
          <button className="text-xs text-gray-400 hover:text-teal-500 transition-colors">
            Edit
          </button>
          <button
            onClick={() => removeTask(task.id)}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
