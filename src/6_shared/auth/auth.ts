import { jwtVerify, SignJWT, type JWTPayload } from "jose";

interface SignOptionInterface {
  expiresIn: "1h" | "15min";
}

const DEFAULT_SIGN_OPTION: SignOptionInterface = {
  expiresIn: "1h",
};

export interface UserJwtPayload extends JWTPayload {
  id: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
const key = new TextEncoder().encode(secretKey);

// Function for creating JWT
export async function signJwt(
  payload: UserJwtPayload,
  options: SignOptionInterface = DEFAULT_SIGN_OPTION
) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(options.expiresIn)
    .sign(key);
  return token;
}

// Function for verifying JWT
export async function verifyJwt(token: string) {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return decoded.payload as UserJwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
