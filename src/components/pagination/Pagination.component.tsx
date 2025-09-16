import type { FC } from "react";

import "./Pagination.styles.scss";

type PropsType = {
  onChangePage: (page: number) => void;
  pageCount: number;
  currentPage: number;
};

export const Pagination: FC<PropsType> = ({
  onChangePage,
  pageCount,
  currentPage,
}) => {
  return (
    <nav className="pagination" aria-label="Page navigation">
      <button
        type="button"
        aria-label="Previous"
        className="pagination__btn pagination__btn-pre"
        onClick={(e) => {
          e.preventDefault();
          onChangePage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <span aria-hidden="true">＜</span>
      </button>

      <ul className="pagination__list">
        {[...new Array(pageCount)].map((_, i) => (
          <li className="pagination__item" key={`${i}_page`}>
            <a
              href="/"
              className={`pagination__item-btn ${
                currentPage === i + 1 ? "pagination__item-btn--active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onChangePage(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="pagination__btn pagination__btn-next"
        onClick={(e) => {
          e.preventDefault();
          onChangePage(currentPage + 1);
        }}
        aria-label="Next"
        disabled={currentPage === pageCount}
      >
        <span aria-hidden="true">＞</span>
      </button>
    </nav>
  );
};
