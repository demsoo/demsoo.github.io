import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BoardTable from '../../components/board/BoardTable';
import Pagination from '../../components/board/Pagination';
import { getPosts, deletePost } from '../../services/boardService';

const PAGE_SIZE = 10;

export default function BoardListPage() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost(id);
      const updated = getPosts();
      setPosts(updated);
      // 삭제 후 현재 페이지에 데이터가 없으면 이전 페이지로
      const totalPages = Math.ceil(updated.length / PAGE_SIZE);
      if (currentPage > totalPages && totalPages > 0) {
        setSearchParams({ page: totalPages });
      }
    }
  };

  const handlePageChange = (page) => {
    setSearchParams({ page });
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pagedPosts = posts.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="page">
      <div className="page-header">
        <h1>게시판</h1>
        <div className="page-header-right">
          <span className="total-count">총 {posts.length}건</span>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/board/create')}
          >
            글쓰기
          </button>
        </div>
      </div>
      <BoardTable posts={pagedPosts} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroupSize={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
