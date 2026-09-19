const API_BASE = import.meta.env.VITE_API_URL || '';
const TOKEN_KEY = 'trinetra_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Images now come back as full Cloudinary URLs (https://res.cloudinary.com/...)
// and are used as-is. Old local paths like "/uploads/products/foo.webp" are
// still resolved against the API base for backward compatibility.
export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (/^https?:\/\//.test(imagePath)) return imagePath;
  return `${API_BASE}${imagePath}`;
};

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const request = async (path, { method = 'GET', body, isFormData = false } = {}) => {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData && body !== undefined) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(data?.message || 'Request failed', res.status);
  }
  return data;
};

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  del: (path) => request(path, { method: 'DELETE' }),
  postForm: (path, formData) => request(path, { method: 'POST', body: formData, isFormData: true }),
  putForm: (path, formData) => request(path, { method: 'PUT', body: formData, isFormData: true }),
};
