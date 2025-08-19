import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addSeparatorToStringNumber(
  value: string | number,
  separator: "." | ","
) {
  if (value === null || value === undefined) {
    return "";
  }
  const numberString = String(value);

  // Separate whole and decimal part
  let decimalPart = "";
  let wholePart = "";

  if (numberString.includes(",")) {
    [wholePart, decimalPart] = numberString.split(",");
  } else if (numberString.includes(".")) {
    [wholePart, decimalPart] = numberString.split(".");
  } else {
    wholePart = numberString;
  }

  let formatedWholePart = "";
  let counter = 0;

  for (let i = wholePart.length - 1; i >= 0; i--) {
    formatedWholePart = wholePart[i] + formatedWholePart;
    counter++;

    if (counter % 3 === 0 && i > 0) {
      formatedWholePart = "." + formatedWholePart;
    }
  }

  if (decimalPart) {
    return formatedWholePart + separator + decimalPart;
  } else {
    return formatedWholePart;
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isStringValidDecimal(str: string): boolean {
  if (typeof str !== "string" || str.trim() === "") {
    return false;
  }

  const numberRegex = /^-?\d+([.,]\d+)?$/;

  return numberRegex.test(str);
}
