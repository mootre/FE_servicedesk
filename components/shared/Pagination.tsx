import _ from "lodash";
import { useState } from "react";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pageStart = currentPage === 1 ? 1 : (currentPage - 1) * pageSize + 1;
  const pageEnd = Math.min(currentPage * pageSize, items);
  const pages = _.range(1, pageCount + 1);

  const onPagePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const onPageNext = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal px-6 text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
        {" "} {pageStart}-{pageEnd}
        </span>
        {" "} of
        <span className="font-semibold text-gray-900 dark:text-white">
        {" "}{items}
        </span>
      </span>
      <ul className="inline-flex -space-x-px text-sm h-8 px-6">
        <li>
          <a
            onClick={() => onPagePrevious()}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <a
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                page === currentPage
                  ? "text-blue-500 hover:text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              } bg-white border border-gray-300 hover:bg-gray-100  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          <a
            onClick={() => onPageNext()}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
