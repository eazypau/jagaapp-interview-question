import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Add, Edit, Delete } from "@mui/icons-material";
import IconButtonComponent from "./IconButtonComponent";

function Accordions({ data, className, handleCreate, showDeleteIcon }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleAccordionChange = (e) => {
		if (!["BUTTON", "path", "svg"].includes(e.target.nodeName)) {
			if (isOpen) setIsOpen(false);
			else setIsOpen(true);
		}
	};

	return (
		<Accordion
			style={{ borderRadius: 0, margin: 0 }}
			sx={{
				"& .css-o4b71y-MuiAccordionSummary-content": {
					margin: "10px 0",
				},
			}}
			className={className ? className : ""}
			expanded={isOpen}
			onChange={handleAccordionChange}
		>
			<AccordionSummary className="summary" expandIcon={<ExpandMoreIcon />}>
				{/* <IconButtonComponent
					buttonType="icon-button"
					variant="primary"
					ariaLabel="create item"
					handleFunction={handleCreate}
					className="btn-icon"
				>
					<Edit />
				</IconButtonComponent> */}
				{showDeleteIcon ? (
					<IconButtonComponent
						buttonType="icon-button"
						variant="primary"
						ariaLabel="create item"
						handleFunction={handleCreate}
                        color="error"
						className="btn-icon"
					>
						<Delete />
					</IconButtonComponent>
				) : (
					<IconButtonComponent
						buttonType="icon-button"
						variant="primary"
						ariaLabel="create item"
						handleFunction={handleCreate}
						className="btn-icon"
					>
						<Edit />
					</IconButtonComponent>
				)}
				<Typography className="summary-title">{data.title}</Typography>
			</AccordionSummary>
			{data.description ? (
				<AccordionDetails>
					<Typography className="details" variant="body2" color={"gray"}>
						{data.description}
					</Typography>
				</AccordionDetails>
			) : (
				""
			)}

			{data.items && data.items.length > 0 && (
				<div>
					{" "}
					{data.items.map((item, index) => {
						const className = "sub-summary";
						return (
							<>
								<Accordions
									key={item.title}
									data={item}
									className={className}
									handleCreate={handleCreate}
                                    showDeleteIcon={showDeleteIcon}
								/>

								{/* button create new item in existing level */}
								{index === data.items.length - 1 ? (
									<IconButtonComponent
										className="btn"
										buttonType="button"
										variant="outlined"
										icon={<Add />}
										handleFunction={handleCreate}
									>
										Item
									</IconButtonComponent>
								) : (
									""
								)}
							</>
						);
					})}
				</div>
			)}

			{/* button create new sub item */}
			{!data.items && (
				<IconButtonComponent
					className="btn"
					buttonType="button"
					variant="outlined"
					icon={<Add />}
					handleFunction={handleCreate}
				>
					New Sub Item
				</IconButtonComponent>
			)}
		</Accordion>
	);
}

function NestedAccordion({ exampleData, handleCreate, showDeleteButton }) {
	const renderAccordions = (exampleData) => {
		return exampleData.map((data) => (
			<div key={data.title}>
				<Accordions data={data} handleCreate={handleCreate} showDeleteIcon={showDeleteButton} className="primary-accordion" />
			</div>
		));
	};

	return (
		<Stack id="nested_accordion" style={{ marginTop: "10px" }}>
			{renderAccordions(exampleData)}
			<IconButtonComponent
				buttonType="button"
				variant="outlined"
				icon={<Add />}
				handleFunction={handleCreate}
			>
				Catergory
			</IconButtonComponent>
		</Stack>
	);
}

export default NestedAccordion;
