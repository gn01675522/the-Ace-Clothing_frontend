import { Pagination } from "@/components";

import type { FC } from "react";

type PropsType = {
  onChangePage: (page: number) => void;
  pageCount: number;
  currentPage: number;
};

export const DataTablePagination: FC<PropsType> = ({
  onChangePage,
  pageCount,
  currentPage,
}) => {
  return (
    <div>
      <Pagination
        onChangePage={onChangePage}
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </div>
  );
};
