export const computedWidthByContainerHelper = (
  windowWidth: number,
  listContainerWidth: number
) => {
  const itemsCount =
    windowWidth > 1535 ? 7 : windowWidth > 1023 ? 5 : windowWidth > 768 ? 3 : 2;
  // 根據螢幕尺寸決定分割多少卡片
  const gapCount = itemsCount - 1;
  // 由於卡片與卡片之間都會有間隔，所以需要額外計算間隔數量
  const cardWidth = (listContainerWidth - 16 * gapCount) / itemsCount;
  // 由於每個間隔設定都是 1rem，所以必須扣掉 16 * 間隔數量的空間再進行運算
  return cardWidth;
};
