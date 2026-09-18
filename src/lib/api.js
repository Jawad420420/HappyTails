import { getToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
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

// Auth
export const signup = ({ name, email, password }) =>
  request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

export const login = ({ email, password }) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getAllUsers = () => request('/auth/users');

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

export const getAllAdoptions = () => request('/adoptions');

export const updateAdoptionStatus = (id, status) =>
  request(`/adoptions/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

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
