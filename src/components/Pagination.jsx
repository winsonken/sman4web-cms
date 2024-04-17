import React, { useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { FiChevronsLeft } from 'react-icons/fi';
import { FiChevronsRight } from 'react-icons/fi';

const Pagination = (props) => {
  const { currentPage, setCurrentPage, totalPage, totalRecord, limitPerPage } =
    props;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPage);
  };

  // Fungsi untuk mengubah halaman ke halaman pertama
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

useEffect(() => {
  if (totalPage == 1) {
    setCurrentPage(1)
  }
}, [totalPage])

  const pageList = [];
  const maxPage = 5;

  if (totalPage <= maxPage) {
    for (let i = 1; i <= totalPage; i++) {
      pageList.push(
        <div
          className={`w-fit min-w-[30px] text-center px-1 py-1 rounded-md cursor-pointer duration-100 ${
            currentPage === i
              ? 'bg-black text-white'
              : 'bg-transparent text-black'
          }`}
          key={i}
          onClick={() => {
            handlePageChange(i);
          }}
        >
          <p className="text-lg font-medium">{i}</p>
        </div>
      );
    }
  } else {
    let startPage = Math.max(1, currentPage - Math.floor(maxPage / 2));
    let endPage = Math.min(startPage + maxPage - 1, totalPage);

    for (let i = startPage; i <= endPage; i++) {
      pageList.push(
        <div
          className={`w-fit min-w-[30px] text-center px-1 py-1 rounded-md cursor-pointer duration-100 ${
            currentPage === i
              ? 'bg-black text-white'
              : 'bg-transparent text-black'
          }`}
          key={i}
          onClick={() => {
            handlePageChange(i);
          }}
        >
          <p className="text-lg font-medium">{i}</p>
        </div>
      );
    }
  }

  const firstList = (currentPage - 1) * limitPerPage + 1;
  const lastList = Math.min(currentPage * limitPerPage, totalRecord);

  return (
    <div className="w-full flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
      <div>
        <p className="text-sm font-medium">
          Showing {firstList}-{lastList} of {totalRecord} entries
        </p>
      </div>

      <div
        className={`pagination w-full flex flex-row justify-center items-center gap-3 overflow-x-auto sm:w-fit ${
          totalRecord <= 1 ? 'hidden' : 'block'
        }`}
      >
        <div className="flex flex-row">
          <div
            className="text-xl cursor-pointer md:text-2xl"
            onClick={handleFirstPage}
          >
            <FiChevronsLeft />
          </div>

          <div
            className="text-xl cursor-pointer md:text-2xl"
            onClick={handlePrevPage}
          >
            <FiChevronLeft />
          </div>
        </div>

        <div className="flex flex-row gap-2">{pageList}</div>

        <div className="flex flex-row">
          <div
            className="text-xl cursor-pointer md:text-2xl"
            onClick={handleNextPage}
          >
            <FiChevronRight />
          </div>
          <div
            className="text-xl cursor-pointer md:text-2xl"
            onClick={handleLastPage}
          >
            <FiChevronsRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
