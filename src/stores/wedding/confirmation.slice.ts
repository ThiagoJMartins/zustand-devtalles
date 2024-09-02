import { StateCreator } from "zustand";

export interface ConfirmationSlice {
	// Properties
	isConfirmed: boolean;

	// Methods
	setIsConfirm: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
	set
) => ({
	// Properties
	isConfirmed: false,

	// Methods
	setIsConfirm: (value: boolean) => {
		set({ isConfirmed: value });
	},
});
