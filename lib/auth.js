import { hash, compare } from "bcryptjs";

export async function hashPassword(pass) {
  const hashedPass = await hash(pass, 12);
  return hashedPass;
}
export async function verifyPassword(pass, hashedPass) {
  const isValid = compare(pass, hashedPass);
  return isValid;
}
