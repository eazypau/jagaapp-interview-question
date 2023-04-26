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
import {
	NestedAccordion,
	ExampleNestedAccordion,
	IconButtonComponent,
	DialogComponent,
} from "../../components/index";
import { generateRandomId } from "../../helpers/generateId";

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
	const [data, setData] = useState([]);
	const [showDeleteButton, setShowDeleteButton] = useState(false);
	const [deleteButtonText, setDeleteButtonText] = useState("Enable Delete Button");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalDetails, setModalDetails] = useState({
		type: "Edit",
		title: "Edit Item",
	});
	const [inputValues, setInputValues] = useState({
		title: "",
		description: "",
	});
	const [parentId, setParentId] = useState("");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const createItemHandler = () => {
		const newItem = {
			id: generateRandomId(),
			title: inputValues.title,
			description: inputValues.description,
			// items: [],
		};

		if (parentId) {
			// using recursion to find the parent id
			const addItems = (items) => {
				return items.map((item) => {
					if (item.id === parentId) {
						if (!item.hasOwnProperty("items")) item.items = [];
						return { ...item, items: [...item.items, newItem] };
					} else if (item.items) {
						return { ...item, items: addItems(item.items) };
					} else {
						return item;
					}
				});
			};
			setData((prevItems) => addItems(prevItems));
		} else {
			// this is only for creating new catergory at the top level
			setData((prevItems) => [...prevItems, { ...newItem }]);
		}

		setModalIsOpen(false);
		setInputValues({
			title: "",
			description: "",
		});
	};

	const EditItemHandler = () => {
		const selectedId = parentId;
		const updateNestedItem = (items) => {
			return items.map((item) => {
				if (item.id === selectedId) {
					// return updatedItem;
					return { ...item, title: inputValues.title, description: inputValues.description };
				} else if (item.items) {
					return { ...item, items: updateNestedItem(item.items) };
				} else {
					return item;
				}
			});
		};

		setData((prevItems) => updateNestedItem(prevItems));
		setModalIsOpen(false);
		setInputValues({
			title: "",
			description: "",
		});
	};

	const DeleteItemHandler = (values) => {
		console.log("delete item");
		// need to find a way to create the items by depth
		// check by parent id
		// scenarios to cover:
		// - delete child item
		// - delete parent with child item(s)
		// - delete only parent and shift child item(s) to parent level
	};

	const showDialogWithDetails = (e, { type, title, selectedItem, parentId }) => {
		e.preventDefault();
		// console.log("parent id: ", parentId);
		if (type === "Create") {
			setInputValues({
				title: "",
				description: "",
			});
			setParentId(parentId);
		} else if (type === "Edit") {
			setInputValues({ ...selectedItem });
			setParentId(parentId);
		} else {
			setInputValues({ ...selectedItem });
			setParentId(parentId);
			// check whether have child
			// if have child item, show prompt
			// else delete child item
		}

		setModalDetails({
			type: type,
			title: title,
		});
		setModalIsOpen(true);
	};

	const processHandler = (e, type, value) => {
		e.preventDefault();
		switch (type) {
			case "Create":
				createItemHandler();
				break;
			case "Edit":
				EditItemHandler();
				break;
			case "Delete":
				DeleteItemHandler();
				break;
			default:
				break;
		}
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

					<Stack className="title-with-buttons-container">
						<Typography variant="h6" className="title">
							Answer
						</Typography>
						<div className="buttons-container">
							<IconButtonComponent
								buttonType="button"
								variant="outlined"
								color="error"
								onClick={enableDeleteButton}
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
						onClick={showDialogWithDetails}
						showDeleteButton={showDeleteButton}
					/>

					<DialogComponent
						modalDetails={modalDetails}
						isOpen={modalIsOpen}
						handleClose={() => setModalIsOpen(false)}
						handleOutput={processHandler}
						inputValues={inputValues}
						onInputChange={(e) => {
							setInputValues((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}));
						}}
					/>
				</TabPanel>
			</TabContext>
		</Box>
	);
}

export default Test1;
