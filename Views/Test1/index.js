import { useState } from "react";
import Head from "next/head";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExampleNestedAccordion from "../../components/ExampleNestedAccordion";
import {
	NestedAccordion,
	ExampleNestedAccordion,
	IconButtonComponent,
	DialogComponent,
} from "../../components/index";

const exampleData = [
	{
		title: "Important List",
		description: "",
		items: [
			{
				title: "Book a restaurant",
				description: "Remember book a restaurant at 6th of December",
				items: [
					{
						title: "Dishes",
						description: "",
						items: [
							{
								title: "Fried Vegetable",
								description: "6pax",
							},
							{
								title: "Fried Chicken",
								description: "4pax",
							},
						],
					},
				],
			},
			{
				title: "Restock groceries",
				description: "Get the butter",
			},
		],
	},
	{
		title: "Urgent",
		description: "",
		items: [
			{
				title: "Fetch kids",
				description: "Today 5pm",
			},
		],
	},
];

function Test1() {
	const [value, setValue] = useState("1");
	const [data, setData] = useState(exampleData);
	const [showDeleteButton, setShowDeleteButton] = useState(false);
	const [deleteButtonText, setDeleteButtonText] = useState("Enable Delete Button");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalDetails, setModalDetails] = useState({
		type: "Edit",
		title: "Edit Item",
	});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const createItemHandler = () => {
		setModalIsOpen(true);
		console.log("create item");
		// need to find a way to create the items by depth
		// check by parent id
	};

	// for edit and delete
	// check by parent id and item id or index

	const enableDeleteButton = () => {
		if (showDeleteButton) {
			setShowDeleteButton(false);
			setDeleteButtonText("Enable Delete Button");
		} else {
			setShowDeleteButton(true);
			setDeleteButtonText("Disable Delete Button");
		}
	};

	const exampleData2 = [
		{
			title: "Important List",
			description: "",
			items: [
				{
					title: "Restock groceries",
					description: "Get the butter",
				},
			],
		},
		{
			title: "Urgent",
			description: "",
			items: [
				{
					title: "Fetch kids",
					description: "Today 5pm",
				},
			],
		},
	];

	const exampleData3 = [
		{
			title: "Important List",
			description: "",
			items: [
				{
					title: "Dishes",
					description: "",
					items: [
						{
							title: "Fried Vegetable",
							description: "6pax",
						},
						{
							title: "Fried Chicken",
							description: "4pax",
						},
					],
				},
				{
					title: "Restock groceries",
					description: "Get the butter",
				},
			],
		},
		{
			title: "Urgent",
			description: "",
			items: [
				{
					title: "Fetch kids",
					description: "Today 5pm",
				},
			],
		},
	];

	return (
		<Box>
			<Head>
				<title>Test 1</title>
			</Head>

			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Question" value="1" />
						<Tab label="Answer" value="2" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<Stack spacing={2}>
						<Typography variant="h5">
							<u>
								<b>Create a Tree View List View</b>
							</u>
						</Typography>
						<Box>
							<Paper sx={{ padding: 1, mb: 2 }}>
								<Typography variant="h6">What the app can do</Typography>
								<ul>
									<li>Able to create parent and children list item</li>
									<li>Able to create unlimited nested object</li>
									<li>Able to open and close any parent list view individually</li>
									<li>Able to open/close all list with 1 button</li>
									<li>Can edit any parent/children name & description</li>
									<li>Can remove any children</li>
									<li>
										Can remove any parent but prompt user two option
										<ul>
											<li>
												Remove entire parent and its nested object. Example: remove the{" "}
												<b>Book a restaurant</b>.<pre>{JSON.stringify(exampleData2, null, 2)}</pre>
											</li>
											<li>
												remove the parent object only, remain its nested object. Example: remove the{" "}
												<b>Book a restaurant</b>.
											</li>
											<pre>{JSON.stringify(exampleData3, null, 2)}</pre>
										</ul>
									</li>
									<li>
										Can reorder any parent/children position *if can use drag & drop that will be a
										bonus
									</li>
								</ul>
							</Paper>
							<Paper sx={{ padding: 1, mb: 1 }}>
								<Typography variant="h6">Design Structure Example</Typography>
								<pre>{JSON.stringify(exampleData, null, 2)}</pre>
							</Paper>
							<Paper sx={{ padding: 1 }}>
								<Typography variant="h6">Example View</Typography>
								<Box component="img" src="/example1.png" width={500} />{" "}
							</Paper>
						</Box>
					</Stack>
				</TabPanel>
				<TabPanel value="2" sx={{ maxWidth: "1200px", margin: "0 auto" }}>
					<Stack spacing={2}>
						<Typography variant="h6">Examples of using Accordions</Typography>
						<hr />
						<ExampleNestedAccordion />
					</Stack>

					{/* <Stack style={{ marginTop: "10px" }} spacing={2}>
						{exampleData.map((data) => (
							<NestedAccordion key="exampleData" exampleData={data} />
						))}
					</Stack> */}

					<Stack className="title-with-buttons-container">
						<Typography variant="h6" className="title">
							Answer
						</Typography>
						<div className="buttons-container">
							<IconButtonComponent
								buttonType="button"
								variant="contained"
								color="error"
								handleFunction={enableDeleteButton}
							>
								{deleteButtonText}
							</IconButtonComponent>
							<IconButtonComponent buttonType="button" variant="contained">
								Close All
							</IconButtonComponent>
						</div>
					</Stack>

					<hr />
					<NestedAccordion
						exampleData={data}
						handleCreate={createItemHandler}
						showDeleteButton={showDeleteButton}
					/>

					<DialogComponent
						modalDetails={modalDetails}
						isOpen={modalIsOpen}
						handleClose={() => setModalIsOpen(false)}
					/>
				</TabPanel>
			</TabContext>
		</Box>
	);
}

export default Test1;
