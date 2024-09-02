import { StateCreator } from "zustand";

export interface PersonSlice {
	// Properties
	firstName: string;
	lastName: string;

	// Methods
	setFirstName: (firstName: string) => void;
	setLastName: (lastName: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
	// Properties
	firstName: "",
	lastName: "",

	// Methods
	setFirstName: (firstName) => set({ firstName }),
	setLastName: (lastName) => set({ lastName }),
});
