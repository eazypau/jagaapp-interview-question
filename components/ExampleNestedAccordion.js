import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React from "react";

function ExampleNestedAccordion() {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>Summary 1</AccordionSummary>
			<AccordionDetails>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga voluptatibus sapiente nobis.
				Eum fuga, optio laudantium, reprehenderit neque sint ab sequi et asperiores fugit tempore in
				natus facere eligendi? Eos.
			</AccordionDetails>
			<Accordion className="sub-summary no-shadow">
				<AccordionSummary expandIcon={<ExpandMoreIcon />}> Sub Summary 1</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga voluptatibus sapiente
					nobis. Eum fuga, optio laudantium, reprehenderit neque sint ab sequi et asperiores fugit
					tempore in natus facere eligendi? Eos.
				</AccordionDetails>
				<Accordion className="sub-summary no-shadow">
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>Sub Sub Summary 1</AccordionSummary>
					<AccordionDetails>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga voluptatibus sapiente
						nobis. Eum fuga, optio laudantium, reprehenderit neque sint ab sequi et asperiores fugit
						tempore in natus facere eligendi? Eos.
					</AccordionDetails>
				</Accordion>
			</Accordion>
		</Accordion>
	);
}

export default ExampleNestedAccordion;
