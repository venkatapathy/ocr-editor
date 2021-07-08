import { ActionType, AppReducerAction, State } from "./types";
import { produce } from "immer";
import type { Draft } from "immer/dist/types/types-external";

export const initialState : State = {
	pageImage: null,
	model: "",
	hocrPage: null,
};

export function reducer(state: State, action: AppReducerAction): State{
	switch(action.type){
		case ActionType.LoadImage: {
			return produce(state, (draft) => {
				draft.pageImage= action.payload.pageImage;
			});
		}
		case ActionType.LoadHocr: {
			return produce(state, (draft) => {
				draft.hocrPage= action.payload.hocrPage
			});
		}
		case ActionType.SetHoverId: {
			return produce(state, (draft) => {
				draft.hoverId = action.payload.hoverId;
			});
		}

	}
}
