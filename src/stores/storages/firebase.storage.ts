import { createJSONStorage, StateStorage } from "zustand/middleware";
import axios from "axios";

const firebaseUrl =
	"https://zustand-devtalles-23a71-default-rtdb.firebaseio.com/zustand";

const FirebaseStorage: StateStorage = {
	getItem: async function (name: string): Promise<string | null> {
		try {
			const { data } = await axios.get(`${firebaseUrl}/${name}.json`);

			return JSON.stringify(data);
		} catch (error) {
			throw error;
		}
	},
	setItem: async function (name: string, value: string): Promise<void> {
		await axios.put(`${firebaseUrl}/${name}.json`, JSON.parse(value));
		return;
	},
	removeItem: function (name: string): unknown | Promise<unknown> {
		sessionStorage.removeItem(name);
		return null;
	},
};

export const customFirebaseStorage = createJSONStorage(() => FirebaseStorage);
