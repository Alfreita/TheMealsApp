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
      throw new Error("Something went wrong");
    }
    const resData = await response.json();
    console.log(resData);
    dispacth({ type: SIGNUP });
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
      throw new Error("Something went wrong");
    }
    const resData = await response.json();
    console.log(resData);
    dispacth({ type: SIGNUP });
  };
};
