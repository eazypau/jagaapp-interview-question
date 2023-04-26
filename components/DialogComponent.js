import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButtonComponent from "./IconButtonComponent";

const modalStyle = {
	bgcolor: "background.paper",
	p: "0 1rem 1rem",
};

const textInputStyle = {
	width: "100%",
	marginBottom: "1em",
};

function DialogComponent({
	modalDetails,
	isOpen,
	handleClose,
	handleOutput,
	inputValues,
	onInputChange,
}) {
	// conditionally render prompt
	if (["Create", "Edit"].includes(modalDetails.type)) {
		return (
			<Dialog open={isOpen} onClose={handleClose}>
				<DialogTitle>{modalDetails.title}</DialogTitle>
				<Box sx={modalStyle} className="modal-box">
					<TextField
						sx={textInputStyle}
						label="Title"
						name="title"
						variant="outlined"
						value={inputValues.title}
						onChange={onInputChange}
					/>
					<TextField
						sx={textInputStyle}
						label="Description"
						name="description"
						variant="outlined"
						value={inputValues.description}
						onChange={onInputChange}
					/>

					<div className="modal-button-container">
						<IconButtonComponent
							buttonType="button"
							variant="contained"
							color="primary"
							onClick={(e) => handleOutput(e, modalDetails.type)}
						>
							Done
						</IconButtonComponent>
						<IconButtonComponent
							buttonType="button"
							variant="contained"
							color="secondary"
							onClick={handleClose}
						>
							Cancel
						</IconButtonComponent>
					</div>
				</Box>
			</Dialog>
		);
	} else {
		return (
			<Dialog open={isOpen} onClose={handleClose}>
				<DialogTitle>Choose One</DialogTitle>
				<Box sx={modalStyle} className="modal-box">
					<Typography>
						Do you want to remove the item including its sub items or only the selected item?
					</Typography>
					<div className="modal-button-container">
						<IconButtonComponent
							buttonType="button"
							variant="contained"
							color="primary"
							onClick={(e) => handleOutput(e, modalDetails.type)}
						>
							Remove All
						</IconButtonComponent>
						<IconButtonComponent
							buttonType="button"
							variant="contained"
							color="primary"
							onClick={(e) => handleOutput(e, modalDetails.type)}
						>
							Remove Selected Item
						</IconButtonComponent>
						<IconButtonComponent
							buttonType="button"
							variant="contained"
							color="secondary"
							onClick={handleClose}
						>
							Cancel
						</IconButtonComponent>
					</div>
				</Box>
			</Dialog>
		);
	}
}

export default DialogComponent;
