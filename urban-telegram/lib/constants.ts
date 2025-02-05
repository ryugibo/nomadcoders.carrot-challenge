export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "암호는 대소문자, 특수문자, 숫자가 모두 포함되어있어야 합니다.";

export const USERNAME_MIN_LENGTH = 3;
