export interface Task {
	id: string;
	title: string;
	status: TaskStatus;
}

export type TaskStatus = "done" | "open" | "in-progress";
