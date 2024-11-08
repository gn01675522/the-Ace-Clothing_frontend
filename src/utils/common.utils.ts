export const formatNumberWithCommas = (number: number): string => {
  const formatNumber = String(number)
    .split("")
    .reverse()
    .reduce((prev, next, i) => {
      return (i % 3 ? next : next + ",") + prev;
    });
  return formatNumber;
};
