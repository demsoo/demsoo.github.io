export default function BoardDetail({ post }) {
  return (
    <div className="board-detail">
      <div className="detail-header">
        <h2>{post.title}</h2>
        <div className="detail-meta">
          <span>작성자: {post.author}</span>
          <span>작성일: {post.createdAt}</span>
          <span>조회수: {post.views}</span>
        </div>
      </div>
      <div className="detail-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
