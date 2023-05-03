const initialState = {
    paginaANavegar: "home"
}

function setState(action, value){
    switch (action){
        case "paginaANavegar":
            initialState.paginaANavegar = value
            break;
        default:
            initialState = initialState
    }
}