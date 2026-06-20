import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { fetchMyTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { TASK_STATUS } from '../utils/constants';

export function useTasks(onUnauthorized) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  const changeFilters = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyTasks(params);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        onUnauthorized?.();
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onUnauthorized]);

  useEffect(() => {
    changeFilters({});
  }, [changeFilters]);

  const addTask = useCallback(async (name, description, taskStatus, taskPriority, dueDate) => {
    const newTask = await createTask(name, description, taskStatus, taskPriority, dueDate);
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const editTask = useCallback(async (taskId, updates) => {
    await updateTask(taskId, updates);
    setTasks((prev) =>
      prev.map((t) => (t.taskId === taskId ? { ...t, ...updates } : t))
    );
  }, []);

  const removeTask = useCallback(async (taskId) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t.taskId !== taskId));
  }, []);

  const moveTask = useCallback(async (taskId, newStatus) => {
    const snapshot = tasksRef.current;
    setTasks((prev) =>
      prev.map((t) => (t.taskId === taskId ? { ...t, taskStatus: newStatus } : t))
    );
    try {
      await updateTask(taskId, { taskStatus: newStatus });
    } catch (err) {
      setTasks(snapshot);
      throw err;
    }
  }, [updateTask]);

  const getFilteredTasks = useCallback(
    (search = '') => {
      if (!search) return tasks;
      return tasks.filter((task) => {
        return (
          task.name?.toLowerCase().includes(search.toLowerCase()) ||
          task.description?.toLowerCase().includes(search.toLowerCase())
        );
      });
    },
    [tasks]
  );

  const stats = useMemo(() => ({
    total: tasks.length,
    inProgress: tasks.filter((t) => t.taskStatus === TASK_STATUS.IN_PROGRESS).length,
    completed: tasks.filter((t) => t.taskStatus === TASK_STATUS.COMPLETED).length,
  }), [tasks]);

  return {
    tasks,
    loading,
    error,
    changeFilters,
    addTask,
    editTask,
    removeTask,
    moveTask,
    getFilteredTasks,
    stats,
  };
}
