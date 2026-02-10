// Mock 데이터 (localStorage 기반 CRUD)
const STORAGE_KEY = 'board_posts';

const getInitialData = () => {
  const authors = ['관리자', '홍길동', '김철수', '이영희', '박지민'];
  return Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    title: `게시글 ${i + 1}번 제목입니다`,
    content: `게시글 ${i + 1}번의 내용입니다. 샘플 데이터입니다.`,
    author: authors[i % authors.length],
    createdAt: `2026-01-${String(Math.min(i + 1, 31)).padStart(2, '0')}`,
    views: Math.floor(Math.random() * 100),
  }));
};

const loadPosts = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getInitialData()));
    return getInitialData();
  }
  return JSON.parse(data);
};

const savePosts = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

// 전체 목록 조회
export const getPosts = () => {
  return loadPosts();
};

// 단건 조회
export const getPostById = (id) => {
  const posts = loadPosts();
  return posts.find((post) => post.id === Number(id)) || null;
};

// 등록
export const createPost = ({ title, content, author }) => {
  const posts = loadPosts();
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
    title,
    content,
    author,
    createdAt: new Date().toISOString().slice(0, 10),
    views: 0,
  };
  const updated = [newPost, ...posts];
  savePosts(updated);
  return newPost;
};

// 수정
export const updatePost = (id, { title, content, author }) => {
  const posts = loadPosts();
  const idx = posts.findIndex((post) => post.id === Number(id));
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], title, content, author };
  savePosts(posts);
  return posts[idx];
};

// 삭제
export const deletePost = (id) => {
  const posts = loadPosts();
  const filtered = posts.filter((post) => post.id !== Number(id));
  savePosts(filtered);
  return true;
};
