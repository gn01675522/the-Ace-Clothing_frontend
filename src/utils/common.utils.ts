export const formatNumberWithCommas = (number: number): string => {
  const formatNumber = String(number)
    .split("")
    .reverse()
    .reduce((prev, next, i) => {
      return (i % 3 ? next : next + ",") + prev;
    });
  return formatNumber;
};

//* 將傳入值做翻譯
export const translateGenderToChinese = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    mens: "男",
    womens: "女",
    hats: "帽子",
    shoes: "鞋",
    accessories: "飾品",
  };

  const splitCategory = category.split("-")[0];
  return categoryMap[splitCategory];
};

//* 將傳入值做分類
export const translateCategoryToChinese = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    top: "上著",
    bottom: "下著",
    neutral: "(中性)",
    mens: "(男性)",
    womens: "(女性)",
    belt: "(皮帶)",
    bracelet: "(手鍊)",
    necklace: "(項鍊)",
    rings: "(戒指)",
    other: "(其他)",
  };

  const splitCategory = category.split("-")[1];
  return categoryMap[splitCategory];
};

//* 將傳入值做格式處理，這邊進來的是 timestamp 以毫秒計算。
export const formatTimestampInMilliSeconds = (
  date: number | string | Date
): string => {
  const newDate = new Date(date);
  const getYear = newDate.getFullYear().toString();
  const getMonth = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const getDate = newDate.getDate().toString().padStart(2, "0");

  return `${getYear}-${getMonth}-${getDate}`;
};

//* 將傳入值做格式處理，這邊進來的是 timestamp 以秒計算。
export const formatTimestampInSeconds = (date: number): string => {
  const newDate = new Date(date * 1000);
  const getYear = newDate.getFullYear().toString();
  const getMonth = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const getDate = newDate.getDate().toString().padStart(2, "0");

  return `${getYear}-${getMonth}-${getDate}`;
};

export const formatDateToMilliSeconds = (date: string) => {
  const timestamp = new Date(date).getTime();
  return timestamp;
};
