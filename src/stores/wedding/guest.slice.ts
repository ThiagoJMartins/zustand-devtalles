import { StateCreator } from "zustand";

export interface GuestSlice {
	// Properties
	guestCount: number;

	// Methods
	setGuestCount: (guestCount: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
	// Properties
	guestCount: 0,

	// Methods
	setGuestCount: (guestCount: number) => {
		set({ guestCount: guestCount > 0 ? guestCount : 0 });
	},
});
