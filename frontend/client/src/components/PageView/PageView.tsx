import ToolBar from "./ToolBar";
import { Stage, Layer, Text, Line } from "react-konva";
import { useMeasure } from "react-use";
import React, { useState, useEffect, useLayoutEffect } from "react";
import ImageView from "./ImageView";
import { useAppReducer } from "../../reducerContext";
import { Link } from "react-router-dom";
import queryString from "query-string";
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadImageUtil } from "../../utils";
import { Button, ButtonGroup, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import {
	loadImage,
	loadHocr,
	logInfo,
	changeCurPage,
} from "../../reducer/actions";
import doOcr from "../../lib/doOcr";
import HocrLayer from "./components/HocrLayer";
import HocrView from "./HocrView";
import axios from "axios";
import "./PageView.css"
import DropDown from './components/DropDown'

function PageViewer() {
	const [state, dispatch] = useAppReducer();
	const parsed = queryString.parse(window.location.search);
	const [curZoom, setCurZoom] = useState(1);
	const [bookDetails, setBookDetails] = useState(null);

	const handleZoom = (zoomDelta: int) => {
		setCurZoom(curZoom + zoomDelta);
	};


	const [imgMeasureRef, { width, height }] = useMeasure();

	useEffect(() => {
		if (!parsed?.p) {
			parsed.p = "1";
		}
		if (parsed?.b) {
			axios.get(
				process.env.REACT_APP_SERVER_URL + "/books/" + parsed.b
			).then((response) => setBookDetails(response.data));
		}

		dispatch(changeCurPage(parseInt(parsed.p)));
		//uu10.129.6.78:5000/h/b/1/p/2
		/* const imageurl =
			process.env.REACT_APP_SERVER_URL +
			"/i/b/" +
			parsed?.b +
			"/p/" +
			parsed?.p; */

		//	if (!state.pageImage) {
		//	}
	}, []);

	const FileOptions = [{
		key: 1,
		value: 'New File',
	}, {
		key: 2,
		value: 'Save File',
	}
	]

	const EditOptions = [{
		key: 3,
		value: 'Undo',
	}, {
		key: 4,
		value: 'Redo',
	}
	]

	const LangOptions = [{
		key: 5,
		value: 'English',
	}, {
		key: 6,
		value: 'Hindi',
	}
	]
	/* const baseURL = "http://localhost:3000/user/saveCall"; */
	const baseURL = "https://addc4874-2a04-4b13-b532-00430ba4e487.mock.pstmn.io/user/putCall";

	const apiCall = (dat: int) => {
		console.log(dat)
		axios
			.put(baseURL, {
				id: dat,
				name: "This is an updated post."
			})
			.then((response) => {
				console.log(response.data);
				alert('Working')
			});
	}
		

		return (
			<>
				<div className="background">
					<div className="container-fluid py-0 headDiv">
						{/* <Link
						className="navbar-brand"
						to="/cli"> */}
						{/* <span className="px-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="42"
								height="42"
								fill="currentColor"
								className="bi bi-arrow-left-circle"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
								/>
							</svg>
						</span> */}
						<div className="head">
							<Navbar bg="white" variant="dark">
								<Container>
									<Nav className="head">
										<NavDropdown title="File" id="nav-dropdown1" className="blackTxt">
											<DropDown options={FileOptions} callAPI={apiCall} />
										</NavDropdown>
										<NavDropdown title="Edit" id="nav-dropdown2">
											<DropDown options={EditOptions} callAPI={apiCall} />
										</NavDropdown>
										<NavDropdown title="Language" id="nav-dropdown3">
											<DropDown options={LangOptions} callAPI={apiCall} />
										</NavDropdown>
										<Nav.Link href="#reports"><span className="blackTxt">Reports</span></Nav.Link>
										<Nav.Link href="#version"><span className="blackTxt">Version</span></Nav.Link>
										<Nav.Link href="#download"><span className="blackTxt">Download</span></Nav.Link>
										<Nav.Link href="#help"><span className="blackTxt">Help</span></Nav.Link>
									</Nav>
								</Container>
							</Navbar>
						</div>

						<div className="format-options-background">
							{/*<ButtonGroup aria-label="Basic example">
								<Button className="button" variant="secondary">Resize Image</Button>
								<Button className="button" variant="secondary">Mark Regions</Button>
								<Button className="button" variant="secondary">Comments Accuracy</Button>
								<Button className="button" variant="secondary">Compare Character Output</Button>		
								</ButtonGroup>
							</div> */}


							<button className="text-format-option icon2">Mark Regions</button>






						</div>


					</div>

					{/* </Link> */}
					{/* <span className="navbar-text px-3 me-auto">
						{bookDetails?.title}
					</span> */}



					<div className="container-fluid pv-container pt-2 pb-4">
						<div className="row wh-90 vh-100 border shadow">
							<div
								className="col-md-6 zeroPadding"
								ref={imgMeasureRef}
							>
								<div className="p-3 border pv-pane">
									<Stage
										width={
											(state
												.pageImage
												?.curWidth !==
												0
												? state
													.pageImage
													?.curWidth
												: width) *
											curZoom
										}
										height={
											(state
												.pageImage
												?.curHeight !==
												0
												? state
													.pageImage
													?.curHeight
												: height) *
											curZoom
										}
									>
										{!state.pageImage && (
											<Layer>
												<Text
													text={
														state
															.pageImage
															?.urlObject
													}
												/>
											</Layer>
										)}
										<Layer>
											<ImageView
												pageImage={
													state.pageImage
												}
												width={
													(state
														.pageImage
														?.curWidth !==
														0
														? state
															.pageImage
															?.curWidth
														: width) *
													curZoom
												}
												height={
													(state
														.pageImage
														?.curHeight !==
														0
														? state
															.pageImage
															?.curHeight
														: height) *
													curZoom
												}
											/>
										</Layer>
										<HocrLayer
											page={
												state.hocrPage
											}
											dispatch={
												dispatch
											}
											pageImage={
												state.pageImage
											}
											width={
												(state
													.pageImage
													?.curWidth !==
													0
													? state
														.pageImage
														?.curWidth
													: width) *
												curZoom
											}
											height={
												(state
													.pageImage
													?.curHeight !==
													0
													? state
														.pageImage
														?.curHeight
													: height) *
												curZoom
											}
											hoverId={
												state.hoverId
											}
										/>
									</Stage>
								</div>
							</div>
							<div className="col-md-6">
								<div className="p-3 border pv-pane">
									<HocrView
										page={
											state.hocrPage
										}
										hoverId={
											state.hoverId
										}
										dispatch={
											dispatch
										}
									/>
								</div>
							</div>
						</div>
						<div className="row fixed-bottom">
							<ToolBar
								curPageno={state.curPageno}
								dispatch={dispatch}
								fnSetCurZoom={handleZoom}
							/>
							<div className="col-md-6 offset-md-4 px-3">

								{state.logInfo}
							</div>
						</div>
					</div>



				</div>
			</>
		);
	}

	export default PageViewer;
