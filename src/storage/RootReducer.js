var initialState={patient:{},doctor:{},answer:{}}

export default function RootReducer(state=initialState,action)
{
    switch(action.type)

    { case "ADD_Answer":
        state.answer[action.payload[0]]=action.payload[1]
        console.log(state.answer)   
        return ({patient:state.patient,doctor:state.doctor,answer:state.answer})
        case "ADD_Doctor":
        state.doctor=action.payload[0]
        console.log(state.doctor)
        return ({patient:state.patient,doctor:state.doctor,answer:state.answer})
        case "ADD_Patient":
            state.patient[action.payload[0]]=action.payload[1]
            console.log(state.patient)
            return ({patient:state.patient,doctor:state.doctor,answer:state.answer})
        case "EDIT_Patient":
            state.patient[action.payload[0]]=action.payload[1]
            console.log(state.patient)
            return ({patient:state.patient,doctor:state.doctor,answer:state.answer})
        case "DELETE_Patient":
            delete state.patient[action.payload[0]]
            console.log(state.patient)
            return ({patient:state.patient,doctor:state.doctor,answer:state.answer})
        default:
            return({patient:state.patient,doctor:state.doctor,answer:state.answer})
    }
}
