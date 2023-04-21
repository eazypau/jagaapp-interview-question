import React from "react";
import Button from "@mui/material/Button";
import { IconButton, dividerClasses } from "@mui/material";

function IconButtonComponent({
	buttonType,
	ariaLabel,
	icon,
	variant,
	handleFunction,
	className = "primary",
	color,
	children,
}) {
	// need to use a condition to render eitehr icon button or button

	if (buttonType === "button") {
		return (
			<Button
				variant={variant}
				startIcon={icon}
				onClick={handleFunction}
				color={color}
				className={className}
			>
				{children}
			</Button>
		);
	} else if (buttonType === "icon-button") {
		return (
			<IconButton
				variant={variant}
				aria-label={ariaLabel}
				onClick={handleFunction}
				color={color}
				className={className}
			>
				{children}
			</IconButton>
		);
	}
}

export default IconButtonComponent;
