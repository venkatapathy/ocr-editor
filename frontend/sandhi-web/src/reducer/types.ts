import PageImageInfo from "../types";
import HocrPage from "../types";
import * as actions from "./actions";

export interface State {
	pageImage: PageImageInfo;
	model: string;
	hocrPage: HocrPage;
	hoverId: string;
	curZoom: string
}

export enum ActionType{
	LoadImage= "LoadImage",
	LoadHocr= "LoadHocr",
	SetHoverId= "SetHoverId",

}

export interface SetHoverIdPayload{
	hoverId: string
}

export interface LoadImagePayload{
	pageImageInfo: PageImageInfo;
}

export interface LoadHocrPayload{
	hocrPage: HocrPage;
}

type Actions = typeof actions;

export type AppReducerAction = ReturnType<Actions[keyof Actions]>;
