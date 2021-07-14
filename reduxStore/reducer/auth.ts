import { SIGNUP, SIGNIN } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SIGNIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
  }
  return state;
};
export default authReducer;
