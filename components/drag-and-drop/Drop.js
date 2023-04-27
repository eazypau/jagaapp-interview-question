import React from "react";
import { Droppable } from "react-beautiful-dnd";

function Drop({ droppableId, type, ...props }) {
	return (
		<Droppable droppableId={droppableId} type={type}>
			{(provided) => {
				return (
					<div ref={provided.innerRef} {...provided.droppableProps} {...props}>
						{props.children}
						{provided.placeholder}
					</div>
				);
			}}
		</Droppable>
	);
}

export default Drop;
