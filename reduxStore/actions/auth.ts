export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const signUp = (email: string, password: string) => {
  return async (dispacth: any) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB78-iyuLiRgv39Rda1Xjfs3uSDgJuX6y8",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errData = await response.json();
      const errorId = errData.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    const token = resData.idToken;
    const userId = resData.localId;
    dispacth({ type: SIGNUP, token, userId });
  };
};

export const login = (email: string, password: string) => {
  return async (dispacth: any) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB78-iyuLiRgv39Rda1Xjfs3uSDgJuX6y8",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errData = await response.json();
      const errorId = errData.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD")
        message = "This password is not valid!";
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    const token = resData.idToken;
    const userId = resData.localId;
    dispacth({ type: SIGNIN, token, userId });
  };
};
