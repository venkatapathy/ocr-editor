import ToolBar from "./ToolBar";
import { Stage, Layer, Text } from "react-konva";
import { useMeasure } from "react-use";
import React, { useState, useEffect, useLayoutEffect } from "react";
import ImageView from "./ImageView";
import { useAppReducer } from "../../reducerContext";
import queryString from "query-string";
import { loadImageUtil } from "../../utils";
import {
	loadImage,
	loadHocr,
	logInfo,
	changeCurPage,
} from "../../reducer/actions";
import doOcr from "../../lib/doOcr";
import HocrLayer from "./components/HocrLayer";
import HocrView from "./HocrView";

function PageViewer() {
	const [state, dispatch] = useAppReducer();
	const parsed = queryString.parse(window.location.search);
	const [curZoom, setCurZoom]=useState(1);
	
	const handleZoom=(zoomDelta:int) =>{
		setCurZoom(curZoom+zoomDelta);
	};
	if (!parsed?.p) {
		parsed.p = "1";
	}

	//const imageurl = "http://10.129.6.78:5000/i/b/1/p/2";
		const imageurl =
                        process.env.REACT_APP_SERVER_URL +
                        "/i/b/" +
                        parsed?.b +
                        "/p/" +
                        parsed?.p;

	//const hocrurl = "http://10.129.6.78:5000/h/b/1/p/2";
		const hocrurl =
                        process.env.REACT_APP_SERVER_URL +
                        "/i/b/" +
                        parsed?.b +
                        "/p/" +
                        parsed?.p;


	const [imgMeasureRef, { width, height }] = useMeasure();

	useLayoutEffect(() => {
		if (!parsed?.p) {
			parsed.p = "1";
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

	return (
		<>
			<ToolBar
				curPageno={state.curPageno}
				dispatch={dispatch}
				fnSetCurZoom={handleZoom}
			/>
			<div className="container-fluid pv-container pt-2 pb-4 px-2">
				<div className="row wh-90 vh-100 border shadow">
					<div
						className="col-md-6 shadow"
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
										: width)*curZoom
								}
								height={
									(state
										.pageImage
										?.curHeight !==
									0
										? state
												.pageImage
												?.curHeight
										: height)*curZoom
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
												: width)*curZoom
										}
										height={
											(state
												.pageImage
												?.curHeight !==
											0
												? state
														.pageImage
														?.curHeight
												: height)*curZoom
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
											: width)*curZoom
									}
									height={
										(state
											.pageImage
											?.curHeight !==
										0
											? state
													.pageImage
													?.curHeight
											: height)*curZoom
									}
									hoverId={
										state.hoverId
									}
								/>
							</Stage>
						</div>
					</div>
					<div className="col-md-6 shadow">
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
					<div className="col-md-6 offset-md-4 px-3">
						{state.logInfo}
					</div>
				</div>
			</div>
		</>
	);
}

export default PageViewer;
