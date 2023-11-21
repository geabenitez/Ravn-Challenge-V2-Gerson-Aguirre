export type JWTPayload = {
  uid: string;
};

export type JWTResponse = {
  access_token: string;
};

export type AuthProcessSignInRequest = {
  username: string;
  password: string;
};

export type AuthProcessSignUpRequest = AuthProcessSignInRequest;

export type AuthProcessSignInResponse = JWTResponse;
