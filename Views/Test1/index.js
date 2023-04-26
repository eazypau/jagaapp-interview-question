import { useRef, useState } from "react";
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
import { findObjectById } from "../../helpers/findObjectById";
import { exampleData, exampleData2, exampleData3 } from "../../sample data/exampleData";

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
	// const [parentId, setParentId] = useState("");
	const selectedItemId = useRef("");
	const parentOfParentId = useRef("");
	const [accordionsList, setAccordionList] = useState({});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleAccordionChange = (id) => {
		if (accordionsList[id]) {
			setAccordionList((prev) => ({
				...prev,
				[id]: false,
			}));
		} else {
			setAccordionList((prev) => ({
				...prev,
				[id]: true,
			}));
		}
	};

	const closeAllAccordions = () => {
		const newAccordionList = { ...accordionsList };

		Object.keys(newAccordionList).forEach((accordion) => {
			newAccordionList[accordion] = false;
		});

		console.log(newAccordionList);

		setAccordionList((prev) => ({ ...newAccordionList }));
	};

	const updateAccordionList = (referenceObj) => {
		// const newAccordionList = {...accordionsList}
		setAccordionList((prev) => {
			const newAccordionList = { ...prev };
			delete newAccordionList(referenceObj.id);

			return { ...newAccordionList };
		});

		if (referenceObj.items) {
			for (let i = 0; i < referenceObj.items.length; i++) {
				updateAccordionList(referenceObj.items[i]);
			}
		}
	};

	const createItemHandler = () => {
		const newItem = {
			id: generateRandomId(),
			title: inputValues.title,
			description: inputValues.description,
			// items: [],
		};

		if (selectedItemId.current) {
			// using recursion to find the parent id
			// assign parentId to sub item
			newItem.parentId = selectedItemId.current;
			const addItems = (items) => {
				return items.map((item) => {
					if (item.id === selectedItemId.current) {
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

		setAccordionList((prev) => ({
			...prev,
			[newItem.id]: false,
		}));
		setModalIsOpen(false);
		setInputValues({
			title: "",
			description: "",
		});
	};

	const editItemHandler = () => {
		const updateNestedItem = (items) => {
			return items.map((item) => {
				if (item.id === selectedItemId.current) {
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

	const deleteItemHandler = (option) => {
		if (option === "child" || option === "all") {
			const deleteNestedItem = (items) => {
				return items.filter((item) => {
					if (item.id === selectedItemId.current) {
						updateAccordionList(item);
						return false;
					} else if (item.items) {
						item.items = deleteNestedItem(item.items);
					}
					return true;
				});
			};
			setData((prevItems) => deleteNestedItem(prevItems));
		} else if (option === "only-parent" && parentOfParentId.current) {
			let parentofParentObj = {};
			let childItems = [];

			for (let i = 0; i < data.length; i++) {
				const searchItem = findObjectById(parentOfParentId.current, data[i]);
				if (searchItem) {
					parentofParentObj = { ...searchItem };
					break;
				}
			}

			for (let i = 0; i < data.length; i++) {
				const searchItem = findObjectById(selectedItemId.current, data[i]);
				if (searchItem) {
					childItems = [...searchItem.items];
					break;
				}
			}

			parentofParentObj.items = [...parentofParentObj.items, ...childItems].filter((item) => {
				if (item.id === selectedItemId.current) {
					// remove id property from accordion list
					setAccordionList((prev) => {
						const newAccordionList = { ...prev };
						delete newAccordionList[item.id];
						return { ...newAccordionList };
					});

					return false;
				}
				return true;
			});

			const replaceParentOfParent = (items) => {
				return items.map((item) => {
					if (item.id === parentOfParentId.current) {
						return { ...item, items: [...parentofParentObj.items] };
					} else if (item.items) {
						item.items = replaceParentOfParent(item.items);
					}
					return item;
				});
			};
			setData((prevItems) => replaceParentOfParent(prevItems));
		} else {
			let selectedItem = data.find((item) => item.id === selectedItemId.current);
			let primaryLayerItems = data.filter((item) => {
				if (item.id === selectedItemId.current) {
					return false;
				}
				return true;
			});

			primaryLayerItems = [...primaryLayerItems, ...selectedItem.items];

			setData((prev) => [...primaryLayerItems]);
		}

		setModalIsOpen(false);
	};

	const showDialogWithDetails = (e, { type, title, selectedItem, selectedId, parentId }) => {
		e.preventDefault();
		// setParentId(selectedId);
		selectedItemId.current = selectedId;
		if (type === "Create") {
			setInputValues({
				title: "",
				description: "",
			});
		} else if (type === "Edit") {
			setInputValues({ ...selectedItem });
		} else {
			let findObj = {};
			for (let i = 0; i < data.length; i++) {
				const searchItem = findObjectById(selectedId, data[i]);
				if (searchItem) {
					findObj = searchItem;
					break;
				}
			}
			// if is just a child item, remove it
			if (!findObj.hasOwnProperty("items")) {
				deleteItemHandler("child");
				return;
			}

			parentOfParentId.current = parentId;
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
				editItemHandler();
				break;
			case "Delete":
				deleteItemHandler(value);
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
							<IconButtonComponent
								buttonType="button"
								variant="contained"
								onClick={closeAllAccordions}
							>
								Close All
							</IconButtonComponent>
						</div>
					</Stack>

					<hr />
					<NestedAccordion
						exampleData={data}
						onClick={showDialogWithDetails}
						showDeleteButton={showDeleteButton}
						accordionList={accordionsList}
						handleAccordionChange={handleAccordionChange}
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
