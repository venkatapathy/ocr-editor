import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppReducer } from "./reducerContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageViewer from "./components/PageView/PageView";
import BooksCatalog from "./components/BooksCatalog";

function App() {
	const [state, dispatch] = useAppReducer();
	const location = window.location.href;
	const [docTitle, setDocTitle] = useState("");
	const [subBrand, setSubBrand] = useState("");

	let params = location.split("?");
	let bookid = "";
	if (params.length > 1) {
		bookid = location.split("?")[1].split("&")[0];
	}

	useEffect(() => {
		let title = window.location.pathname;
		console.log(title);
		if (title.localeCompare("/cli") == 0) {
			setDocTitle("Books Catalog List");
			setSubBrand("");
		} else if (title.localeCompare("/cli/pageview") == 0) {
			setDocTitle("Sukra Neeti Sara");
			setSubBrand("Page Viewer");
		}
	}, [docTitle]);

	return (
		<Router>
			<nav className="navbar navbar-expand-md shadow-sm rounded p-0 m-0">
				<div className="container-fluid py-0">
					<a className="navbar-brand" href="/cli">
						{subBrand !== "" && (
							<span className="px-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="42"
									height="42"
									fill="currentColor"
									class="bi bi-arrow-left-circle"
									viewBox="0 0 16 16"
								>
									<path
										fill-rule="evenodd"
										d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
									/>
								</svg>
							</span>
						)}
						Sandhi
						<span className="navbar-subbrand px-2">
							{subBrand}
						</span>
					</a>
					<span className="navbar-text px-3 me-auto">
						{docTitle}
					</span>
				</div>
			</nav>
			<Switch>
				<Route exact path="/cli">
					<BooksCatalog />
				</Route>
				<Route exact path="/cli/pageview">
					<PageViewer />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
