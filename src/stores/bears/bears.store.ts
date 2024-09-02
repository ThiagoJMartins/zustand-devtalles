import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { customSessionStorage } from "../storages/session.storage";

interface Bear {
	id: number;
	name: string;
}

interface BearState {
	// Properties
	blackBears: number;
	polarBears: number;
	pandaBears: number;

	bears: Bear[];

	// Methods
	totalBears: () => number;

	increaseBlackBears: (by: number) => void;
	increasePolarBears: (by: number) => void;
	increasePandaBears: (by: number) => void;

	doNothing: () => void;
	addBear: () => void;
	clearBears: () => void;
}

export const useBearStore = create<BearState>()(
	persist(
		(set, get) => ({
			// Properties
			blackBears: 0,
			polarBears: 0,
			pandaBears: 0,

			bears: [],

			// Methods
			totalBears: () => {
				return (
					get().blackBears +
					get().polarBears +
					get().pandaBears +
					get().bears.length
				);
			},

			increaseBlackBears: (by: number) =>
				set((state) => ({ blackBears: state.blackBears + by })),
			increasePolarBears: (by: number) =>
				set((state) => ({ polarBears: state.polarBears + by })),
			increasePandaBears: (by: number) =>
				set((state) => ({ pandaBears: state.pandaBears + by })),

			doNothing: () => set((state) => ({ bears: [...state.bears] })),
			addBear: () =>
				set((state) => ({
					bears: [
						...state.bears,
						{
							id: state.bears.length + 1,
							name: `Oso #${state.bears.length + 1}`,
						},
					],
				})),
			clearBears: () => set({ bears: [] }),
		}),
		{ name: "bears-storage", storage: customSessionStorage }
	)
);
