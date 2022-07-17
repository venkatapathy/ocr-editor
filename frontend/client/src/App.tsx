import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppReducer } from "./reducerContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageViewer from "./components/PageView/PageView";
import BooksCatalog from "./components/BooksCatalog";
import SearchPage from "./components/SearchPage";

function App() {
	const [state, dispatch] = useAppReducer();
	const location = window.location.href;

	let params = location.split("?");
	let bookid = "";
	if (params.length > 1) {
		bookid = location.split("?")[1].split("&")[0];
	}

	const styleCSS = {
		backgroundColor: '#1b1b53'
	}

	return (
		<Router>
			<Switch>
				<Route path="/cli/search">
					<SearchPage />
				</Route>

				<Route exact path="/cli">
					<nav className="navbar navbar-dark navbar-expand-md shadow-sm p-0 m-0" style={styleCSS}>
						<div className="container-fluid py-0">
							<Link
								className="navbar-brand"
								to="/cli"
							>
								SandHI
							</Link>
							<span className="navbar-text px-3 me-auto">
								Books Catalog
								List
							</span>
						</div>
					</nav>

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
