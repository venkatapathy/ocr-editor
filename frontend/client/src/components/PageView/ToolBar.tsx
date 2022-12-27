import React, { Dispatch, useEffect, useState } from "react";
import queryString from "query-string";
import { loadImageUtil } from "../../utils";
import {
	loadImage,
	loadHocr,
	logInfo,
	changeCurPage,
} from "../../reducer/actions";
import doOcr from "../../lib/doOcr";
/* import { FaArrowAltCircleLeft } from 'react-icons/fa'; */
export interface Props {
	curPageNo: int;
	fnSetCurZoom;
	dispatch: Dispatch<AppReducerAction>;

}

function ToolBar({ curPageno, dispatch, fnSetCurZoom }: Props) {
	const [zoom, setZoom] = useState(100);
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
		handleChange()
	}, [curPageno]);

	return (
		<div className="container-fluid pv-toolbar footerBorder footerTxt">
			<div className="row align-items-left">
				<div className="col-4">
					<span className="btn footerTxt gray">OCR tool</span>
					<button className="pageviewer footerStyles">
						<select name="lang" id="language" style={{backgroundColor: "transparent", border: "none"}}>
							<option style={{}} value="English">English</option>
							<option value="Devnagari">Devnagari</option>
						</select>
					</button>
				</div>
				<div className="col-4 centerContent">
					<div>
						<button
							type="button"
							className="btn toolbar-btn px-2"
							style={curPageno == 1 ? { color: "#a2a3a5" } : {}}
							title="Previous Page"
							onClick={(e) => {
								if (curPageno - 1 > 0) {
									dispatch(
										changeCurPage(parseInt(curPageno) - 1)
									);
								}
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 384 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>			</button>

						<span className="pageNum">Page {curPageno}</span>

						<button
							type="button"
							className="btn toolbar-btn px-2"
							title="Next Page"
							onClick={(e) => {
								if (curPageno + 1 > 0) {
									dispatch(changeCurPage(parseInt(curPageno) + 1));
								}
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>				</button>

					</div></div><div className="col-4 flexEnd"><button className="pageviewer footerStyles dictionary">Dictionaries</button>
					<span className="footerStyles slp">SLP</span>
					<button
						type="button"
						className="btn toolbar-btn px-2"
						title="Zoom-in"
						onClick={() => {
							fnSetCurZoom(0.25)
							setZoom(zoom + 25)
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
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

					<span className="footerStyles footerTxt" style={{ marginTop: "7.5px" }}>{zoom}%</span>

					<button
						type="button"
						className="btn toolbar-btn px-2"
						style={zoom <= 25 ? { color: "#a2a3a5" } : {}}
						title="Zoom-out"
						onClick={() => {
							if (zoom > 25) {
								fnSetCurZoom(-0.25)
								setZoom(zoom - 25)
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
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
				</div></div>
		</div>
	);
}

export default ToolBar;
