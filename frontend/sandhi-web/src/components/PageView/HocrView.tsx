import Page from "../../types";
import "./HocrView.css";
import { Dispatch } from "react";
import {setHoverId} from "../../reducer/actions";

export interface Props {
	page: Page | null;
	width: int;
	height: int;
	hoverId: string;
	dispatch: Dispatch<AppReducerAction>;
}

function HocrView({ page, hoverId, dispatch }: Props) {
	if (page == null) {
		return <div></div>;
	}

	const RenderWord = (wordarray, hoverId) => {
		if (!wordarray) {
			return;
		}
		const handleHover = (thoverId) => {
			dispatch(setHoverId(thoverId));
		};

		const WordsEl = wordarray.map((wordChild) => (
			<span
				className={`ocr_word ${
					hoverId === wordChild.id ? "hoved" : ""
				}`}
				key={wordChild.id}
				onMouseEnter={() => {
					handleHover(wordChild.id);
					//setHoverId(e.target.attrs.id)
				}}
				onMouseLeave={() => {
					handleHover("");
					//setHoverId('');
					//e.target.strokeEnabled(false);

					//setPrevHoverId(e.target.attrs.id);
				}}
			>
				{wordChild.text}{" "}
			</span>
		));
		return WordsEl;
	};

	const linesEl = page.children.map((lineChild) => (
		<>
			<span className="ocr_line" key={lineChild.id}>
				{RenderWord(lineChild.children, hoverId)}
			</span>
			<br />
		</>
	));
	return (
		<div>
			<p>{linesEl}</p>
		</div>
	);
}

export default HocrView;
