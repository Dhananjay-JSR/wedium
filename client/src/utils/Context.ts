import React from "react"



export const ReContext = React.createContext<{
    state: {
        data: string | null;
    }
    dispatch: React.Dispatch<{
        type: ActionType;
        payload: string;
    }>    
}>({} as {
    state: {
        data: string | null;
    }
    dispatch: React.Dispatch<{
        type: ActionType;
        payload: string;
    }>
})


export enum ActionType {
ADD
}


export function ActionFn(state:{
    data:string|null
}, action:{
    type:ActionType,
    payload:string
}){
    switch (action.type){

        case ActionType.ADD :
            return {
                ...state,
                data:action.payload
            }
        default:
            return {...state}
        
    }

}
