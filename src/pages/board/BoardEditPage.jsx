import { useParams, useNavigate } from 'react-router-dom';
import BoardForm from '../../components/board/BoardForm';
import { getPostById, updatePost } from '../../services/boardService';

export default function BoardEditPage() {
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

  const handleSubmit = (formData) => {
    updatePost(id, formData);
    alert('게시글이 수정되었습니다.');
    navigate('/board');
  };

  return (
    <div className="page">
      <h1>게시글 수정</h1>
      <BoardForm
        initialData={post}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/board')}
      />
    </div>
  );
}
