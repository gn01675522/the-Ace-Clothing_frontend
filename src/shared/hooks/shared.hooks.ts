import { useEffect } from "react";

export const useToScrollToTop = ({
  dependencies = [],
}: {
  dependencies?: any[];
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, dependencies);
};
