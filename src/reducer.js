// State
export const initialState  = { 
    user: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            };
            default: 
            return state;
    }
}
export default reducer






//     public constructor() {
//         this.token = localStorage.getItem("token");
//         if(this.token) {
//             const encodedObject = jwtDecode(this.token);
//             this.user = encodedObject.user;
//         }
//     }
    
// }

// // Action Type
// export enum AuthActionType {
//     Register = "Register",
//     Login = "Login",
//     Logout = "Logout"
// }

// // Action
// export interface AuthAction {
//     type: AuthActionType;
//     payload?: string; // Optional (on Logout we don't need to supply a payload)
// }

// // Action Creators: 
// export function registerAction(token) {
//     return { type: AuthActionType.Register, payload: token };
// }
// export function loginAction(token: string): AuthAction {
//     return { type: AuthActionType.Login, payload: token };
// }
// export function logoutAction(): AuthAction {
//     return { type: AuthActionType.Logout };
// }

// // Reducer: 
// export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

//     const newState = { ...currentState };

//     switch (action.type) {
//         case AuthActionType.Register:
//         case AuthActionType.Login:
//             newState.token = action.payload; // Here the payload is the token sent from the backend.
//             const encodedObject: any = jwtDecode(newState.token); // Convert to any for getting the inside "user" object.
//             newState.user = encodedObject.user;
//             localStorage.setItem("token", newState.token);
//             break;
//         case AuthActionType.Logout:
//             newState.token = null;
//             newState.user = null;
//             localStorage.removeItem("token");
//             break;
//     }

//     return newState;
