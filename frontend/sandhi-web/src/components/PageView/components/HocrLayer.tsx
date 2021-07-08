import HocrPage from "../../types";
import React, { Dispatch, useRef, useState } from "react";
import { useAppReducer } from "../../../reducerContext";
import { Layer, Image, Rect } from "react-konva";
import sortArray from "sort-array";
import { setHoverId } from "../../../reducer/actions";

export interface Props {
	page: HocrPage | null;
	pageImage: PageImageInfo | null;
	dispatch: Dispatch<AppReducerAction>;
	hoverId: string;
}

export default function HocrLayer({
	page,
 	pageImage,	
	dispatch,
	hoverId,
}: Props) {
	const layerRectRefs = useRef([]);

	const handleHover = (thoverId) => {
		dispatch(setHoverId(thoverId));
	};
	const RenderWrdFunction = (wordarray, pageImage, hoverId) => {
		if (!wordarray) {
			return;
		}

		const wordsArray = sortArray(Array.from(wordarray), {
			by: "area",
			order: "desc",
			computed: {
				area: (word) => {
					//console.log(word);
					if (word.bbox) {
						return (
							(word.bbox.x1 -
								word.bbox.x0) *
							(word.bbox.y1 -
								word.bbox.y0)
						);
					} else {
						return 0;
					}
				},
			},
		});
		const wordsEl = wordsArray.map((lineChild) => (
			<Rect
				id={lineChild.id}
				ref={(el) => {
					layerRectRefs.current[lineChild.id] =
						el;
				}}
				className="ocr_lines"
				key={lineChild.id}
				x={parseInt(
					(lineChild.bbox?.x0 *
						pageImage?.curWidth) /
						pageImage?.orgWidth
				)}
				y={parseInt(
					(lineChild.bbox?.y0 *
						pageImage?.curHeight) /
						pageImage?.orgHeight
				)}
				width={
					((lineChild.bbox.x1 -
						lineChild.bbox.x0) *
						pageImage?.curWidth) /
					pageImage?.orgWidth
				}
				height={
					((lineChild.bbox.y1 -
						lineChild.bbox.y0) *
						pageImage?.curHeight) /
					pageImage?.orgHeight
				}
				stroke="red"
				//strokeEnabled={true}
				strokeEnabled={(function () {

					if (hoverId === lineChild.id) {

						return true;
					} else {
				//		console.log(hoverId);

						return false;
					}
				})()}
				onMouseEnter={(e) => {
					//console.log(e);
					handleHover(e.target.attrs.id);
				}}
				onMouseLeave={(e) => {
					handleHover("");
				}}
			/>
		));

		return wordsEl;
	};

	if (page === null || pageImage === null) {
		return <Layer></Layer>;
	}
	const linesArray = sortArray(Array.from(page.children), {
		by: "area",
		order: "desc",
		computed: {
			area: (word) => {
				if (word.bbox) {
					return (
						(word.bbox.x1 - word.bbox.x0) *
						(word.bbox.y1 - word.bbox.y0)
					);
				} else {
					return 0;
				}
			},
		},
	});
	const linesEl = linesArray.map((lineChild) => (
		<React.Fragment>
			<Rect
				id={lineChild.id}
				ref={(el) => {
					layerRectRefs.current[lineChild.id] =
						el;
				}}
				className="ocr_lines"
				key={lineChild.id}
				x={parseInt(
					(lineChild.bbox?.x0 *
						pageImage?.curWidth) /
						pageImage?.orgWidth
				)}
				y={parseInt(
					(lineChild.bbox.y0 *
						pageImage?.curHeight) /
						pageImage?.orgHeight
				)}
				width={
					((lineChild.bbox.x1 -
						lineChild.bbox.x0) *
						pageImage?.curWidth) /
					pageImage?.orgWidth
				}
				height={
					((lineChild.bbox.y1 -
						lineChild.bbox.y0) *
						pageImage?.curHeight) /
					pageImage?.curHeight
				}
			/>
			{RenderWrdFunction(
				lineChild.children,
				pageImage,
				hoverId
			)}
		</React.Fragment>
	));

	return <Layer>{linesEl}</Layer>;
}

