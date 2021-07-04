export interface Bbox {
	x0: number;
	y0: number;
	x1: number;
	y1: number;
}

export interface OcrElement<T extends string> {
	type: T;
	id: string;
	bbox: Bbox;
}

export interface Word extends OcrElement<"word"> {
	size: number | null;
	confidence: number | null;
	language: string;
	text: string;
}

export interface OcrContainer<T extends string, C extends OcrElement<any>>
	extends OcrElement<T> {
	children: C[];
}

export interface Line
	extends OcrContainer<"line" | "caption" | "textfloat", Word> {
	size: number | null;
}

export interface HocrPage extends OcrContainer<"page", Line> {
	title: string;
	version: string;
	version: string;
	image: string | null;
}

export interface PageImageInfo {
	curWidth: number;
	curHeight: number;
	urlObject: string;
	orgWidth: number;
	orgHeight: number;
}

export interface BookInfo{
	bookId: int;
	totPages: int;
	curPageNum: int;
}
