import { useNavigate } from 'react-router-dom';

export default function BoardTable({ posts, onDelete }) {
  const navigate = useNavigate();

  if (posts.length === 0) {
    return <p className="empty-message">등록된 게시글이 없습니다.</p>;
  }

  return (
    <table className="board-table">
      <thead>
        <tr>
          <th className="col-id">번호</th>
          <th className="col-title">제목</th>
          <th className="col-author">작성자</th>
          <th className="col-date">작성일</th>
          <th className="col-views">조회수</th>
          <th className="col-actions">관리</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td
              className="title-cell"
              onClick={() => navigate(`/board/${post.id}`)}
            >
              {post.title}
            </td>
            <td>{post.author}</td>
            <td>{post.createdAt}</td>
            <td>{post.views}</td>
            <td>
              <button
                className="btn btn-sm btn-edit"
                onClick={() => navigate(`/board/edit/${post.id}`)}
              >
                수정
              </button>
              <button
                className="btn btn-sm btn-delete"
                onClick={() => onDelete(post.id)}
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
