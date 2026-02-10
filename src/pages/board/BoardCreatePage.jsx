import { useNavigate } from 'react-router-dom';
import BoardForm from '../../components/board/BoardForm';
import { createPost } from '../../services/boardService';

export default function BoardCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    createPost(formData);
    alert('게시글이 등록되었습니다.');
    navigate('/board');
  };

  return (
    <div className="page">
      <h1>게시글 등록</h1>
      <BoardForm onSubmit={handleSubmit} onCancel={() => navigate('/board')} />
    </div>
  );
}
