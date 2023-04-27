import { Draggable } from "react-beautiful-dnd";

function Drag({ draggableId, index, ...props }) {
	return (
		<Draggable draggableId={draggableId} index={index}>
			{(provided, snapshot) => {
				return (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						{...props}
					>
						{props.children}
					</div>
				);
			}}
		</Draggable>
	);
}

export default Drag;
