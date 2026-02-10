export default function Pagination({ currentPage, totalPages, pageGroupSize = 5, onPageChange }) {
  if (totalPages <= 1) return null;

  // 현재 페이지가 속한 그룹 계산
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const hasPrevGroup = startPage > 1;
  const hasNextGroup = endPage < totalPages;

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        &laquo;
      </button>
      <button
        className="page-btn"
        disabled={!hasPrevGroup}
        onClick={() => onPageChange(startPage - 1)}
      >
        &lsaquo;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={!hasNextGroup}
        onClick={() => onPageChange(endPage + 1)}
      >
        &rsaquo;
      </button>
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        &raquo;
      </button>
    </div>
  );
}
