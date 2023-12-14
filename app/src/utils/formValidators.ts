import { emailRegex } from "./regexes";

export const samePasswordValidator = (
  firstPass: string,
  secondPass: string
) => {

  return firstPass !== secondPass;
};

export const emailValidator = (email: string) => {
  return emailRegex.test(email);
}
