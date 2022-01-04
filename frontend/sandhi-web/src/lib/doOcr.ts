import OcrTextDocument from "../reducer/types";
import raw from "../data/out.hocr";
import { Page, Word, Line } from "../type";
import assert from "assert";

/* Asyncronous funtion to fetch hocr from OCR- Server service and if all good parse them into custom ocrLines for this project.
 * OcrText state gets updated at the end of this function call
 * */

function assertClassName(className: string, expected: string | string[]) {
	if (Array.isArray(expected)) {
		assert(
			expected.some((val) => val === className),
			"Expected element to have class name of one of: %s, received %s.",
			JSON.stringify(expected),
			className
		);

		return;
	}

	assert(
		expected === className,
		"Expected element to have class name of %s, received %s.",
		expected,
		className
	);
}

function parseAttrBbox(title: string): Bbox {
	const matches = title.match(/bbox ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+)/);

	if (!matches) {
		throw new Error("No bbox attribute found in title.");
	}

	return {
		x0: +matches[1],
		y0: +matches[2],
		x1: +matches[3],
		y1: +matches[4],
	};
}

function parseNumberAttribute(title: string, name: string): number | null {
  const matches = title.match(new RegExp(`${name} (-?[0-9]+(?:\\.[0-9]+)?)`));

  if (!matches) {
    return null;
  }

  return parseFloat(matches[1]);
}


const parseAttrWordSize = (title: string): number | null =>
	parseNumberAttribute(title, "x_fsize");

const parseAttrConfidence = (title: string): number | null =>
	parseNumberAttribute(title, "x_wconf");

const parseAttrLineSize = (title: string): number | null =>
	parseNumberAttribute(title, "x_size");

function parseWord(element: Element): Word {
	assertClassName(element.className, "ocrx_word");

	const title = element.getAttribute("title") ?? "";

	return {
		type: "word",
		id: element.getAttribute("id") ?? "",
		bbox: parseAttrBbox(title),
		size: parseAttrWordSize(title),
		confidence: parseAttrConfidence(title),
		language: element.getAttribute("lang") ?? "",
		text: element.textContent ?? "",
	};
}

function parseLine(element: Element): Line {
	assertClassName(element.className, [
		"ocr_line",
		"ocr_caption",
		"ocr_textfloat",
	]);

	const title = element.getAttribute("title") ?? "";

	let type: "line" | "caption" | "textfloat" = "line";

	if (element.className === "ocr_caption") {
		type = "caption";
	}

	if (element.className === "ocr_textfloat") {
		type = "textfloat";
	}

	return {
		type,
		id: element.getAttribute("id") ?? "",
		bbox: parseAttrBbox(title),
		size: parseAttrLineSize(title),
		children: Array.from(element.children).map(parseWord),
	};
}

function parsePage(doc: Document):Page {
	const p = doc.querySelector(".ocr_page");

	if (!p) {
		throw new Error(
			'Could not find an element with class "ocr_page".'
		);
	}

	const title = p.getAttribute("title") ?? "";

	const lineel = doc.querySelectorAll(".ocr_line");

	if (!lineel) {
		throw new Error(
			'Could not find an element with class "ocr_line".'
		);
	}

	return {
		type: "page",
		id: p.getAttribute("id") ?? "",
		title: doc.title,
		bbox: parseAttrBbox(title),
		children: Array.from(lineel).map(parseLine),
	};
}

export default function doOcr(hocrurl): Promise<Page> {
	//first call the server with image POST and get a hocr text in return( or an error?)
	//
	

	return fetch(hocrurl)
		.then((r) => r.text())
		.then((text) => {
			console.log("Enter2");
			const doc = new DOMParser().parseFromString(
				text,
				"text/html"
			);

			return parsePage(doc);

		},(error) => {
			console.log(error);
		});

	

}
