import { addSeparatorToStringNumber } from "@/6_shared";

export function getRightFormatedNumber(
  value: string,
  decimalSeparator: "." | ",",
  valueSeparator: "." | ","
) {
  let parts = [];
  if (value.includes(".")) {
    parts = value.split(".");
  } else {
    parts = value.split(",");
  }
  const integerPart = parts[0] || "0";
  const decimalPart = parts[1];

  const formattedIntegerPart = addSeparatorToStringNumber(
    integerPart,
    valueSeparator
  );

  const formattedDecimalPart = (decimalPart || "").padEnd(2, "0").slice(0, 2);

  return formattedIntegerPart + decimalSeparator + formattedDecimalPart;
}

export function getReplaceCalmaWithDot(number: string) {
  return String(number).replace(",", ".");
}
