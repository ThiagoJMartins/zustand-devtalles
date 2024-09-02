import { create, StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface TaskState {
	// Properties
	tasks: Record<string, Task>;
	dragginTaskId?: string;

	// Actions
	addTask: (title: string, status: TaskStatus) => void;
	totalTasks: () => number;
	getTaskByStatus: (status: TaskStatus) => Task[];
	setDragginTaskId: (id: string) => void;
	removeDragginTaskId: () => void;
	changeTaskStatus: (id: string, status: TaskStatus) => void;
	onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<
	TaskState,
	[["zustand/devtools", never], ["zustand/immer", never]]
> = (set, get) => ({
	// Properties
	tasks: {
		"1": {
			id: "1",
			title: "Task 1",
			status: "open",
		},
		"2": {
			id: "2",
			title: "Task 2",
			status: "in-progress",
		},
		"3": {
			id: "3",
			title: "Task 3",
			status: "open",
		},
		"4": {
			id: "4",
			title: "Task 4",
			status: "open",
		},
	},
	dragginTaskId: undefined,

	// Actions
	addTask(title: string, status: TaskStatus) {
		const newTask = {
			id: uuidv4(),
			title,
			status,
		};

		//? Zustand native way to update the state
		// set((state) => ({
		// 	tasks: {
		// 		...state.tasks,
		// 		[newTask.id]: newTask,
		// 	},
		// }));

		//? Immer Produce way to update the state
		// set(
		// 	produce((state: TaskState) => {
		// 		state.tasks[newTask.id] = newTask;
		// 	})
		// );

		//? Immer Middleware way to update the state
		set((state) => {
			state.tasks[newTask.id] = newTask;
		});
	},
	totalTasks() {
		const task = get().tasks;
		return Object.keys(task).length;
	},
	getTaskByStatus(status: TaskStatus) {
		const task = get().tasks;
		return Object.values(task).filter((task) => task.status === status);
	},
	setDragginTaskId(id: string) {
		set({ dragginTaskId: id });
	},
	removeDragginTaskId() {
		set({ dragginTaskId: undefined });
	},
	changeTaskStatus(id: string, status: TaskStatus) {
		//? Zustand native way to update the state
		// const task = get().tasks[id];
		// set({
		// 	tasks: {
		// 		...get().tasks,
		// 		[id]: {
		// 			...task,
		// 			status,
		// 		},
		// 	},
		// });

		//? Immer Produce way to update the state
		// set(
		// 	produce((state: TaskState) => {
		// 		state.tasks[id].status = status;
		// 	})
		// );

		//? Immer Middleware way to update the state
		set((state) => {
			state.tasks[id].status = status;
		});
	},
	onTaskDrop(status: TaskStatus) {
		const dragginTaskId = get().dragginTaskId;
		if (!dragginTaskId) return;
		get().changeTaskStatus(dragginTaskId, status);
		get().removeDragginTaskId();
	},
});

export const useTaskStore = create<TaskState>()(
	devtools(
		persist(immer(storeApi), {
			name: "task-storage",
		})
	)
);
