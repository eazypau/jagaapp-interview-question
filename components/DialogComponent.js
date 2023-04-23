import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButtonComponent from "./IconButtonComponent";

const modalStyle = {
	width: 400,
	bgcolor: "background.paper",
	p: "0 1rem 1rem",
};

const textInputStyle = {
	width: "100%",
	marginBottom: "1em",
};

const buttonsContainerStyle = {
	display: "flex",
	justifyContent: "end",
};

function DialogComponent({ modalDetails, isOpen, handleClose, handleOutput, inputValues }) {
	// conditionally render prompt
	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>Edit Item</DialogTitle>
			<Box sx={modalStyle}>
				<TextField sx={textInputStyle} label="Outlined" variant="outlined" />
				<TextField sx={textInputStyle} label="Outlined" variant="outlined" />

				<div style={buttonsContainerStyle}>
					<IconButtonComponent
						buttonType="button"
						variant="contained"
						color="primary"
						onClick={handleOutput}
					>
						Done
					</IconButtonComponent>
					<IconButtonComponent
						buttonType="button"
						variant="contained"
						color="secondary"
						style={{ marginLeft: "0.5em" }}
						onClick={handleClose}
					>
						Cancel
					</IconButtonComponent>
				</div>
			</Box>
		</Dialog>
	);
}

export default DialogComponent;
