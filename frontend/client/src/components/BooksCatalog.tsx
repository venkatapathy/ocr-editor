import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    axios
      .get(listBookUrl)
      .then((response) => {
        setOnlineBookList(response.data.data);
      })
      .catch((er) => {
        setAlertMessage({
          msg: er.response.data,
          variant: "danger",
        });
        setShowAlert(true);
      });
  };

	useEffect(() => {
		refreshBookList();
	}, []);
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
    <tr key={bookItem.repo_name}>
      <th>{index + 1}</th>
      <td>{bookItem.repo_name}</td> {/* changed title to repo_name */}
      <td>{bookItem.author}</td>
      <td>{bookItem.category}</td>
      <td>
        <Link to={"/cli/pageview?b=" + bookItem.repo_name}>View Book</Link>
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
				setAlertMessage({
					msg: "Successfully saved the book to the SandHI catalog",
					variant: "success",
				});
				setShowAlert(true);
				refreshBookList();
			})
			.catch((er) => {
				setAlertMessage({
					msg: er.response?.data,
					variant: "danger",
				});
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
								Category
							</Form.Label>
							<Form.Control
								as="select"
								id="category"
								name="category"
							>
								<option value="general">
									General
								</option>
								<option value="ganitha">
									Ganitha
								</option>
								<option value="philosophy">
									Philosophy
								</option>
								<option value="article">
									Article
								</option>
							</Form.Control>
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
							variant={
								alertMessage?.variant
							}
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
										Category
									</th>
									<th scope="col">
										Link
										to
										the
										book
									</th>
								</tr>
							</thead>
							<tbody style={{color:'#1b1b53'}}>
								<tr>
									<td
										colSpan={
											5
										}
									>
										<Link to="/cli/search">
											{" "}
											Search
											the
											Catalog
										</Link>
									</td>
								</tr>

								{trItem}
								<tr>
									<td
										colSpan={5}
									>
										<Button
											variant="link"
											onClick={handleShow}
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
