import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppReducer } from "./reducerContext";
import ToolBar from "./components/ToolBar";

function App() {
	const [state, dispatch] = useAppReducer();
	const location = window.location.href;

	let params = location.split("?");
	let bookid ="";
	console.log(location.split("?")[1].split("&")[0]);
	if (params.length > 1) {
		bookid = location.split("?")[1].split("&")[0];
	}

	useEffect(() => {
		let params = location.split("?");
		console.log(location.split("?")[1].split("&")[0]);
		if (params.length > 1) {
			bookid = location.split("?")[1].split("&")[0];
		}
	});

	return (
		<>
			<nav className="navbar navbar-expand-md shadow-sm rounded p-0 m-0">
				<div className="container-fluid py-0">
					<a className="navbar-brand" href="#">
						Sandhi
						<span className="navbar-subbrand px-2">
							Page Viewer {bookid}
						</span>
					</a>
					<span className="navbar-text px-3 me-auto">
						Sukra Neeti Sara
					</span>
				</div>
			</nav>
			<ToolBar />
			<div className="container-fluid pv-container pt-2 pb-4 px-2">
				<div className="row vh-100 gx-2">
					<div className="col-md-6">
						<div className="p-3 border pv-pane">
							Custom column padding
						</div>
					</div>
					<div className="col-md-6">
						<div className="p-3 border pv-pane">
							Custom column padding
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
