import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";

function BooksCatalog() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const trItem = booksList.map((bookItem, index) => (
		<tr key={bookItem._id.$oid}>
			<th>{index}</th>
			<td>{bookItem.title}</td>
			<td>{bookItem.author}</td>
			<td>
				<a
					href={
						"/cli/pageview?b=" +
						bookItem._id.$oid
					}
				>
					View Book
				</a>
			</td>
		</tr>
	));
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Woohoo, you're reading this text in a
					modal!
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleClose}
					>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={handleClose}
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="container">
				<div className="row">
					<div className="col">
						<table class="table table-striped">
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
										colspan={
											4
										}
									>
										<Button variant="link" onClick={handleShow}>
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
