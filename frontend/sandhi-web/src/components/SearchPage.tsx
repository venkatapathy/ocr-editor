import "./SearchPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

export default function SearchPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [alertMessage, setAlertMessage] = useState({});
	const [showAlert, setShowAlert] = useState(false);
	const [searchResults, setSearchResults] = useState({});

	const searchResultsDiv = searchResults?.response?.docs.map(
		(bookItem, index) => (
			<div className="card col-12 col-md-8 border-0 pt-4" key={bookItem.id}>
				<Link
					to={
						"/cli/pageview?b=" +
						bookItem.bookuuid +
						"&p=" +
						bookItem.pageno
					}
					className="card-link stretched-link"
					target="_blank" rel="noopener noreferrer"
				>
					{process.env.REACT_APP_SERVER_URL +
						"/cli/pageview?b=" +
						bookItem.bookuuid +
						"&p=" +
						bookItem.pageno}
				</Link>
				<div className="card-title pt-2 inline-headers">
					<h5>{bookItem?.title}</h5>
					<span className="badge bg-light text-dark rounded-pill">
						Page {bookItem.pageno}
					</span>
				</div>
				<div className="card-body p-0 m-0 text-muted d-inline-block text-truncate">
					{bookItem.author}
				</div>
			</div>
		)
	);

	const refreshSearchResults = async (qvalue) => {
		const queryURL =
			process.env.REACT_APP_SERVER_URL + "/s/" + qvalue;
		await axios
			.get(queryURL)
			.then((response) => {
				setSearchResults(response.data);
			})
			.catch((er) => {
				if (er.response) {
					setAlertMessage({
						msg: er.response?.data,
						variant: "danger",
					});
				} else {
					setAlertMessage({
						msg: "Unkown errro in server",
						variant: "danger",
					});
				}
				setShowAlert(true);
			});
	};

	const handleInputChange = (event) => {
		if (event.key === "Enter") {
			refreshSearchResults(event.target.value);
			console.log(searchResultsDiv);
			return;
		} else {
			setSearchQuery(event.target.value);
		}
	};
	return (
		<>
			<div className="container-fluid px-5 pt-5">
				<div className="row align-items-center shadow p-2">
					<Link to="/cli">back to Catalog</Link>
					<div className="col-12 col-md-4 col-lg-2">
						<p className="h1">Sandhi</p>
					</div>
					<div className="col-12 col-md-8 col-lg-8">
						<input
							type="text"
							className="form-control form-control-lg"
							id="exampleFormControlInput1"
							placeholder="enter your search string"
							onKeyDown={
								handleInputChange
							}
						/>
					</div>
					<Alert
						variant="danger"
						onClose={() =>
							setShowAlert(false)
						}
						dismissible
						show={showAlert}
						variant={alertMessage?.variant}
					>
						{alertMessage?.msg}
					</Alert>
				</div>
			</div>

			<div className="container-fluid p-0 m-0">
				<hr />
			</div>

			<div className="container">
				<div className="row">
					<div
						className="col-12 col-md-4"
						show={searchResults?.response}
					>
						<h6 className="text-muted">
							{
								searchResults
									?.response
									?.numFound
							}{" "}
							results in 1008
							milliseconds
						</h6>
					</div>
				</div>
				<div className="row border shadow-lg pb-4">
					{searchResultsDiv}
				</div>
			</div>
		</>
	);
}
