import { StateCreator } from "zustand";

export interface DateSlice {
	// Properties
	eventDate: Date;

	// Methods
	eventYYYYMMDD: () => string;
	eventHHMM: () => string;

	setEventDate: (partialDate: string) => void;
	setEventTime: (partialTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
	// Properties
	eventDate: new Date(),

	// Methods
	eventYYYYMMDD: () => {
		return get().eventDate.toISOString().split("T")[0];
	},
	eventHHMM: () => {
		const hours = get().eventDate.getHours().toString().padStart(2, "0");
		const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");

		return `${hours}:${minutes}`;
	},
	setEventDate: (partialDate: string) => {
		const date = new Date(partialDate);

		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate() + 1;

		const newDate = new Date(get().eventDate);
		newDate.setFullYear(year);
		newDate.setMonth(month);
		newDate.setDate(day);

		set({ eventDate: newDate });
	},
	setEventTime: (partialTime: string) => {
		const hours = parseInt(partialTime.split(":")[0]);
		const minutes = parseInt(partialTime.split(":")[1]);

		const newDate = new Date(get().eventDate);
		newDate.setHours(hours);
		newDate.setMinutes(minutes);

		set({ eventDate: newDate });
	},
});
