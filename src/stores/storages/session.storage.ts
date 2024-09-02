import { createJSONStorage, StateStorage } from "zustand/middleware";

const CustomStorage: StateStorage = {
	getItem: function (name: string): string | null | Promise<string | null> {
		const data = sessionStorage.getItem(name);

		return data;
	},
	setItem: function (name: string, value: string): void {
		sessionStorage.setItem(name, value);
	},
	removeItem: function (name: string): unknown | Promise<unknown> {
		sessionStorage.removeItem(name);
		return null;
	},
};

export const customSessionStorage = createJSONStorage(() => CustomStorage);
