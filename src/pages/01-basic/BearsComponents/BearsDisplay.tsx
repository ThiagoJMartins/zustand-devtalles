import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../../components";
import { useBearStore } from "../../../stores";

export const BearsDisplay = () => {
	const bears = useBearStore(useShallow((state) => state.bears));
	const doNothing = useBearStore((state) => state.doNothing);
	const addBear = useBearStore((state) => state.addBear);
	const clearBears = useBearStore((state) => state.clearBears);

	return (
		<WhiteCard className="flex flex-col items-center">
			<h2 className="text-center">Lista de Osos</h2>
			<div className="flex flex-col gap-2">
				<button onClick={doNothing}>Hacer nada</button>
				<button onClick={addBear}>Agregar Oso</button>
				<button onClick={clearBears}>Limpiar Osos</button>
			</div>
			<pre>{JSON.stringify(bears, null, 2)}</pre>
		</WhiteCard>
	);
};
