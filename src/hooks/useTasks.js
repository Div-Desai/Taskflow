import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTasks, createTask, updateTask, deleteTask } from "../util/taskUtil";
import { useAuth } from "../features/auth/AuthContext";

export function useTasks() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: () => getTasks(user?.id),
    enabled: !!user,
  });
}

export function useCreateTask(onSuccess) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created");
      onSuccess?.();
    },
    onError: () => toast.error("Failed to create task"),
  });
}

export function useUpdateTask(onSuccess) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated");
      onSuccess?.();
    },
    onError: () => toast.error("Failed to update task"),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted");
    },
    onError: () => toast.error("Failed to delete task"),
  });
}
