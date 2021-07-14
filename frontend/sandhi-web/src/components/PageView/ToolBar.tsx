import React, { Dispatch, useEffect } from "react";
import queryString from "query-string";
import { loadImageUtil } from "../../utils";
import {
	loadImage,
	loadHocr,
	logInfo,
	changeCurPage,
} from "../../reducer/actions";
import doOcr from "../../lib/doOcr";

export interface Props {
	curPageNo: int;
	fnSetCurZoom;
	dispatch: Dispatch<AppReducerAction>;
	
}

function ToolBar({ curPageno, dispatch, fnSetCurZoom }: Props) {
	const parsed = queryString.parse(window.location.search);
	const imageurl =
		process.env.REACT_APP_SERVER_URL +
		"/i/b/" +
		parsed?.b +
		"/p/" +
		curPageno;

	const hocrurl =
		process.env.REACT_APP_SERVER_URL +
		"/h/b/" +
		parsed?.b +
		"/p/" +
		curPageno;

		

	const handleChange = (e) => {
		console.log("handling page change +" + imageurl);
		fetch(imageurl)
			.then((r) => r.blob())
			.then(async (blob) => {
				if (!blob.type.includes("image")) return;

				const pageImage = await loadImageUtil(blob);

				if (!pageImage) {
					return;
				}

				//defaulting to 100% of div

				pageImage.curWidth = 0;
				pageImage.curHeight = 0;
				dispatch(loadImage(pageImage));

				const page: HocrPage = await doOcr(hocrurl);
				dispatch(loadHocr(page));
			});
	};

	useEffect(() => {
		handleChange();
	}, [curPageno]);

	return (
		<div className="container-fluid pv-toolbar border">
			<div className="row align-items-left shadow">
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
								<path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2V2z" />
							</svg>
						</button>
					</span>

					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Previous Page"
						onClick={(e) => {
							if (curPageno - 1 > 0) {
								dispatch(
									changeCurPage(
										parseInt(
											curPageno -
												1
										)
									)
								);
							}
						}}
					>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg>			</button>

					<span className="border-start border-2 h-100 rounded-pill"></span>

					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Next Page"
						onClick={(e) => {
							if (curPageno + 1 > 0) {
								dispatch(
									changeCurPage(
										parseInt(
											curPageno +
												1
										)
									)
								);
							}
						}}
					>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg>				</button>
					<span className="page-num">
						<input
							type="text"
							value={curPageno}
							className="well-shadow"
							onChange={handleChange}
						/>
						<span className="border-0">
							of 217
						</span>
					</span>
				</div>
				<div className="col">
					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Zoom-in"
						onClick={()=>fnSetCurZoom(0.25)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							className="bi bi-zoom-in"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
							/>
							<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
							<path
								fillRule="evenodd"
								d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
							/>
						</svg>
					</button>

					<span className="border-start border-2 h-100 rounded-pill"></span>

					<button
						type="button"
						className="btn btn-light toolbar-btn px-2"
						title="Zoom-out"
						onClick={()=>fnSetCurZoom(-0.25)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							className="bi bi-zoom-out"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
							/>
							<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
							<path
								fillRule="evenodd"
								d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ToolBar;
