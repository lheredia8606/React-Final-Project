export const isMonthValid = (monthString: string) => {
  if (monthString.length !== 2) return false;
  const month = parseInt(monthString);
  if (month < 1 || month > 12) return false;
  return true;
};

export const isDayValid = (dayString: string) => {
  if (dayString.length !== 2) return false;
  const day = parseInt(dayString);
  if (day < 1 || day > 12) return false;
  return true;
};

export const isYearValid = (yearString: string) => {
  if (yearString.length !== 4) return false;
  const year = parseInt(yearString);
  const currentYear = new Date().getFullYear();
  if (year < currentYear - 120 || year > new Date().getFullYear()) return false;
  return true;
};

export const isValidDate = (
  day: number,
  month: number,
  year: number
): boolean => {
  const date = new Date(year, month - 1, day);

  const isDayValid = date.getDate() === day;
  const isMonthValid = date.getMonth() === month - 1;
  const isYearValid = date.getFullYear() === year;

  return isDayValid && isMonthValid && isYearValid;
};

export const isDigit = (char: string): boolean => {
  const digitRegex = /^\d$/;
  return digitRegex.test(char);
};
