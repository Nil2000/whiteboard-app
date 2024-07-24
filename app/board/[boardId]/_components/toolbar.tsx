export const Toolbar = () => {
	return (
		<div className="absolute top-[50%] left-2 flex flex-col gap-y-4 -translate-y-[50%]">
			<div className="bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md">
				<div>Pencil</div>
				<div>Square</div>
				<div>Circle</div>
			</div>
			<div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
				<div>Undo</div>
				<div>redo</div>
			</div>
		</div>
	);
};
