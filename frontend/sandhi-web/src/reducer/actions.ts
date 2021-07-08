import {ActionType, LoadImagePayload, LoadHocrPayload} from "./types";
import { createAction } from "@reduxjs/toolkit";
import {PageImageInfo, HocrPage} from "../types";

export const changeCurPage= createAction<(curPageno: int) =>{payload: ChangeCurPagePayLoad},
	Action.Type.ChangeCurPage
>(ActionType.ChangeCurPage, (curPageno) =>({
	payload: {
		curPageno,
	},
}));

export const logInfo= createAction<(logInfo: string) =>{payload: LogInfoPayload},
	Action.Type.SetLogInfo
>(ActionType.LogInfo, (logInfo) => ({
	payload: {
		logInfo,
	},
}));

export const setHoverId = createAction<
	(hoverId: string) => {payload: SetHoverIdPayload},
	ActionType.SetHoverId
>(ActionType.SetHoverId, (hoverId) => ({
	payload: {
		hoverId,
	},
}));

export const loadImage = createAction<
	(pageImage: PageImageInfo) => { payload: LoadImagePayload },
	ActionType.LoadImage
>(ActionType.LoadImage, (pageImage) => ({
	payload: {
		pageImage,
	},
}));

export const loadHocr = createAction<
	(hocrPage: HocrPage) => { payload: LoadHocrPayload },
	ActionType.LoadHocr
>(ActionType.LoadHocr, (hocrPage) => ({
	payload: { hocrPage },
}));
