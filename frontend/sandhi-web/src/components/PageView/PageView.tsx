import ToolBar from "./ToolBar";
import { Stage, Layer, Text } from "react-konva";
import { useMeasure } from "react-use";
import React, { useEffect, useLayoutEffect } from "react";
import ImageView from "./ImageView";
import { useAppReducer } from "../../reducerContext";
import queryString from "query-string";
import { loadImageUtil } from "../../utils";
import { loadImage, loadHocr } from "../../reducer/actions";
import doOcr from "../../lib/doOcr";
import HocrLayer from "./components/HocrLayer";
import HocrView from "./HocrView";

function PageViewer() {
	const [state, dispatch] = useAppReducer();
	const parsed = queryString.parse(window.location.search);

	if (!parsed?.p) {
		parsed.p = "1";
	}

	const imageurl = "http://10.129.6.78:5000/i/b/1/p/2";
	/*	const imageurl =
                        process.env.REACT_APP_SERVER_URL +
                        "/i/b/" +
                        parsed?.b +
                        "/p/" +
                        parsed?.p;
*/
	const hocrurl = "http://10.129.6.78:5000/h/b/1/p/2";
	/*	const imageurl =
                        process.env.REACT_APP_SERVER_URL +
                        "/i/b/" +
                        parsed?.b +
                        "/p/" +
                        parsed?.p;
*/

	const [imgMeasureRef, { width, height }] = useMeasure();

	useLayoutEffect(() => {
		if (!parsed?.p) {
			parsed.p = "1";
		}
		//uu10.129.6.78:5000/h/b/1/p/2
		/* const imageurl =
			process.env.REACT_APP_SERVER_URL +
			"/i/b/" +
			parsed?.b +
			"/p/" +
			parsed?.p; */

		//	if (!state.pageImage) {
		fetch("http://10.129.6.78:5000/i/b/1/p/2")
			.then((r) => r.blob())
			.then(async (blob) => {
				if (!blob.type.includes("image")) return;

				const pageImage = await loadImageUtil(blob);

				if (!pageImage) {
					return;
				}

				//defaulting to 100% of div

				//pageImage.curWidth = width;
				//pageImage.curHeight = height;
				console.log(width);
				dispatch(loadImage(pageImage));

				const page: HocrPage = await doOcr(hocrurl);
				dispatch(loadHocr(page));
			});
		//	}
	}, []);

	return (
		<>
			<ToolBar />
			<div className="container-fluid pv-container pt-2 pb-4 px-2">
				<div className="row wh-90 vh-100 border shadow">
					<div className="col-md-6 shadow">
						<div
							className="p-3 border pv-pane"
							ref={imgMeasureRef}
						>a
							<Stage
								width={
									state
										.pageImage
										?.curWidth
								}
								height={
									state
										.pageImage
										?.curHeight
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
					<div className="col-md-6 offset-md-4 px-3"></div>
				</div>
			</div>
		</>
	);
}

export default PageViewer;
