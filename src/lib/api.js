const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong. Please try again.');
  }

  return data;
}

export const signup = ({ name, email, password, role }) =>
  request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
  });

export const login = ({ email, password }) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

// Pets
export const getPets = (params = {}) => {
  const query = new URLSearchParams();
  if (params.type && params.type !== 'all') query.append('type', params.type);
  if (params.status) query.append('status', params.status);
  if (params.search) query.append('search', params.search);
  const qStr = query.toString();
  return request(`/pets${qStr ? `?${qStr}` : ''}`);
};

export const getPetById = (id) => request(`/pets/${id}`);

export const createPet = (data) =>
  request('/pets', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const deletePet = (id) =>
  request(`/pets/${id}`, {
    method: 'DELETE',
  });

// Adoptions
export const submitAdoption = (data) =>
  request('/adoptions', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getMyAdoptions = () => request('/adoptions/my');

// Vaccinations
export const addVaccination = (data) =>
  request('/vaccinations', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateVaccination = (id, data) =>
  request(`/vaccinations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const getMyVaccinations = () => request('/vaccinations');

export const deleteVaccination = (id) =>
  request(`/vaccinations/${id}`, {
    method: 'DELETE',
  });
