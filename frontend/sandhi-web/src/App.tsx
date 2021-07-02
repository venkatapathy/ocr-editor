import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<>
			<nav className="navbar navbar-expand-md shadow-sm rounded p-0 m-0">
				<div className="container-fluid py-0">
					<a className="navbar-brand" href="#">
						Sandhi 
						<span className="navbar-subbrand px-2">
							Page Viewer
						</span>
					</a>
					<span className="navbar-text px-3 me-auto">
						Sukra Neeti Sara
					</span>
				</div>
			</nav>
		<div className="container-fluid pv-toolbar">
			<div className="row align-items-center">
				<div className="col pl-3">
					<span className="pe-md-5">
					<button
						type="button"
						className="btn btn-light toolbar-btn"
						title="Toggle Side-pane Window"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-layout-sidebar"
							viewBox="0 0 16 16"
						>
							<path
								d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2V2z"
							/>
						</svg>
					</button>
					</span>


					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Previous Page"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-arrow-down"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
							></path>
						</svg>
					</button>

					<span
						className="border-start border-2 h-100 rounded-pill"
					>
					</span>

					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Next Page"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-arrow-up"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
							/>
						</svg>
					</button>
					<span className="page-num">
						<input
							type="text"
							value="7"
							className="well-shadow"
						/>
						<span className="border-0"
							>of 217</span
						>
					</span>
				</div>
				<div className="col">
					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Zoom-in"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-zoom-in"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
							/>
							<path
								d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"
							/>
							<path
								fillRule="evenodd"
								d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
							/>
						</svg>
					</button>

					<span
						className="border-start border-2 h-100 rounded-pill"
					>
					</span>

					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Zoom-out"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-zoom-out"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
							/>
							<path
								d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"
							/>
							<path
								fillRule="evenodd"
								d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
					</button>
					<span className="zoom">
						<select>
							<option value="100"
								>100%</option
							>
						</select>
					</span>
				</div>
			</div>
		</div>
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
