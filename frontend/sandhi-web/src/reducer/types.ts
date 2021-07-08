import PageImageInfo from "../types";
import HocrPage from "../types";
import * as actions from "./actions";

export interface State {
	pageImage: PageImageInfo;
	model: string;
	hocrPage: HocrPage;
	hoverId: string;
	curZoom: string;
	logInfo: string;
	curPageno: int;
}

export enum ActionType {
	LoadImage = "LoadImage",
	LoadHocr = "LoadHocr",
	SetHoverId = "SetHoverId",
	LogInfo = "LogInfo",
	ChangeCurPage = "ChangeCurPage",
}

export interface ChangeCurPagePayload {
	curPageno: int;
}

export interface LogInfoPayload {
	logInfo: string;
}

export interface SetHoverIdPayload {
	hoverId: string;
}

export interface LoadImagePayload {
	pageImage: PageImageInfo;
}

export interface LoadHocrPayload {
	hocrPage: HocrPage;
}

type Actions = typeof actions;

export type AppReducerAction = ReturnType<Actions[keyof Actions]>;
