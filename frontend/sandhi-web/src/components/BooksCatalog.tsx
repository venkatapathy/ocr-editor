import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function BooksCatalog() {
	const [show, setShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const [inputValues, setInputValues] = useState({});
	const [onlineBookList, setOnlineBookList] = useState([]);
	const [alertMessage, setAlertMessage] = useState({});

	const form = useRef(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const refreshBookList = () => {
		const listBookUrl = process.env.REACT_APP_SERVER_URL + "/books";
		axios.get(listBookUrl)
			.then((response) => {
				setOnlineBookList(response.data);
			})
			.catch((er) => {
				setAlertMessage({msg:er.response.data,variant: "danger"});
				setShowAlert(true);
			});
	};

	useEffect(() => {
		refreshBookList();
	},[]);
	const booksList = [
		{
			_id: { $oid: "60e72548f67de168a975542a" },
			title: "Sukra Neeti Sara",
			author: "A Author",
			fullpath: "/path/to/book/pdf",
		},
		{
			_id: { $oid: "60e2cd9237ca51041bc241de" },
			title: "Sukra Neeti Sara",
			author: "A Author",
			fullpath: "/path/to/book/pdf",
		},
		{
			_id: { $oid: "60e2cf76b7873293bb9ba1ed" },
			title: "Vara 68",
			author: "A Author",
			fullpath: "/path/to/pdf",
		},
		{
			_id: { $oid: "60e2d0b5b7873293bb9ba1ee" },
			title: "Vara 68 and 86",
			author: "A Author",
			fullpath: "/path/to/pdf",
		},
	];

	const trItem = onlineBookList.map((bookItem, index) => (
		<tr key={bookItem._id.$uuid}>
			<th>{index+1}</th>
			<td>{bookItem.title}</td>
			<td>{bookItem.author}</td>
			<td>
				<a
					href={
						"/cli/pageview?b=" +
						bookItem._id.$uuid
					}
				>
					View Book
				</a>
			</td>
		</tr>
	));

	const handleInputChange = (event) => {
		const target = event.target;
		const value =
			target.type === "checkbox"
				? target.checked
				: target.value;
		const name = target.id;
		let shallow = Object.assign({}, inputValues);
		shallow[name] = value;
		setInputValues(shallow);
	};

	const handleBookSubmit = (e) => {
		e.preventDefault();
		const frmData = new FormData(form.current);
		const addBookUrl = process.env.REACT_APP_SERVER_URL + "/books";
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios.post(addBookUrl, frmData, config)
			.then((response) => {
				//console.log(response);
				setAlertMessage({msg:"Successfully saved the book to the SandHI catalog",variant:"success"});
				setShowAlert(true);
				refreshBookList();
			})
			.catch((er) => {
				console.log(er);
				setAlertMessage({msg:er.response?.data,variant:"danger"});
				setShowAlert(true);
			});
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header>
					<Modal.Title>
						Add a book to SandHI catalog
						using this form
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						ref={form}
						onSubmit={handleBookSubmit}
					>
						<Form.Group>
							<Form.Label>
								Book Title
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Book Title"
								onChange={
									handleInputChange
								}
								id="title"
								name="title"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								Author of the
								book
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name of the Author"
								onChange={
									handleInputChange
								}
								id="author"
								name="author"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								Number of pages
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Number of pages"
								id="noofpages"
								name="noofpages"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								Pdf File of the
								book
							</Form.Label>

							<Form.File
								id="uploaded_file"
								name="uploaded_file"
							/>
						</Form.Group>
						<br />
						<Button
							variant="primary"
							type="submit"
						>
							Submit
						</Button>
						<Alert
							variant="danger"
							onClose={() =>
								setShowAlert(
									false
								)
							}
							dismissible
							show={showAlert}
							variant={alertMessage?.variant}
						>
							{alertMessage?.msg}
						</Alert>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleClose}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="container">
				<div className="row">
					<div className="col">
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">
										#
									</th>
									<th scope="col">
										Title
									</th>
									<th scope="col">
										Author
									</th>
									<th scope="col">
										Link
										to
										the
										Book
									</th>
								</tr>
							</thead>
							<tbody>
								{trItem}
								<tr>
									<td
										colSpan={
											4
										}
									>
										<Button
											variant="link"
											onClick={
												handleShow
											}
										>
											Add
											a
											book
											to
											the
											Catalog
										</Button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
export default BooksCatalog;
