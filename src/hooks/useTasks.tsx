import { useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
	value: TaskStatus;
}

export const useTasks = ({ value }: Options) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
	const inDraggin = useTaskStore((state) => !!state.dragginTaskId);
	const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
	const addTask = useTaskStore((state) => state.addTask);
	const [onDragOver, setOnDragOver] = useState(false);

	const handleAddTask = async () => {
		const res = await Swal.fire({
			title: "Nueva tarea",
			input: "text",
			inputLabel: "Nombre de la tarea",
			inputPlaceholder: "Ingrese el nombre de la tarea",
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return "Debe ingresar un nombre para la tarea";
				}
			},
			confirmButtonText: "Agregar",
			cancelButtonText: "Cancelar",
		});
		if (!res.isConfirmed)
			return Toast.fire({
				icon: "info",
				title: "Tarea cancelada",
			});
		addTask(res.value, value);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(false);
		onTaskDrop(value);
	};

	return {
		//Properties
		inDraggin,

		//Methods
		onDragOver,
		handleAddTask,
		handleDragOver,
		handleDragLeave,
		handleDrop,
	};
};
