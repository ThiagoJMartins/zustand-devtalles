import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { devtools } from "zustand/middleware";
import { createDateSlice, DateSlice } from "./date.slice";
import {
	ConfirmationSlice,
	createConfirmationSlice,
} from "./confirmation.slice";

type BoundState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<BoundState>()(
	devtools((...a) => ({
		...createPersonSlice(...a),
		...createGuestSlice(...a),
		...createDateSlice(...a),
		...createConfirmationSlice(...a),
	}))
);
