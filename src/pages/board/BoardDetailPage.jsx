import { useParams, useNavigate } from 'react-router-dom';
import BoardDetail from '../../components/board/BoardDetail';
import { getPostById, deletePost } from '../../services/boardService';

export default function BoardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = getPostById(id);

  if (!post) {
    return (
      <div className="page">
        <p>게시글을 찾을 수 없습니다.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/board')}>
          목록으로
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost(id);
      navigate('/board');
    }
  };

  return (
    <div className="page">
      <BoardDetail post={post} />
      <div className="detail-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/board/edit/${id}`)}
        >
          수정
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          삭제
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/board')}>
          목록
        </button>
      </div>
    </div>
  );
}
