import {ActionType, LoadImagePayload, LoadHocrPayload} from "./types";
import { createAction } from "@reduxjs/toolkit";
import {PageImageInfo, HocrPage} from "../types";

export const setHoverId = createAction<
	(hoverId: string) => {payload: SetHoverIdPayload},
	ActionType.SetHoverId
>(ActionType.SetHoverId, (hoverId) => ({
	payload: {
		hoverId,
	},
}));

export const loadImage = createAction<
	(pageImageInfo: PageImageInfo) => { payload: LoadImagePayload },
	ActionType.LoadImage
>(ActionType.LoadImage, (pageImageInfo) => ({
	payload: {
		pageImageInfo,
	},
}));

export const loadHocr = createAction<
	(hocrPage: HocrPage) => { payload: LoadHocrPayload },
	ActionType.LoadHocr
>(ActionType.LoadHocr, (hocrPage) => ({
	payload: { hocrPage },
}));
