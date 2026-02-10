import { useState, useEffect } from 'react';

export default function BoardForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        content: initialData.content || '',
        author: initialData.author || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.author.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    onSubmit(form);
  };

  return (
    <form className="board-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="author">작성자</label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          placeholder="작성자를 입력하세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={form.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? '수정' : '등록'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
}
