import {
  AGE_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  MIN_AGE,
} from "../../../constants";

export const validateAge = (dateOfBirth: string): string => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < MIN_AGE) {
    return AGE_ERROR_MESSAGE;
  } else {
    return "";
  }
};

export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return EMAIL_ERROR_MESSAGE;
  }
  return "";
};
