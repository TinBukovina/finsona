import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOptionInterface {
  expiresIn: "1h";
}

const DEFAULT_SIGN_OPTION: SignOptionInterface = {
  expiresIn: "1h",
};

export interface UserJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

// Function for creating JWT
export function signJwt(
  payload: JwtPayload,
  options: SignOptionInterface = DEFAULT_SIGN_OPTION
) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(payload, secret, options);
  return token;
}

// Function for verifying JWT
export function verifyJwt(token: string) {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret);
    return decoded as UserJwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
