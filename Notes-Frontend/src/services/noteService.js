import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllNotes = () => axios.get(`${BASE_URL}/note`);

export const createNote = (note) => axios.post(`${BASE_URL}/note`, note);
export const deleteNote = (noteId) =>
  axios.delete(`${BASE_URL}/note/id/${encodeURIComponent(noteId)}`);

export const updateNote = (noteId, note) =>
  axios.put(`${BASE_URL}/note/id/${encodeURIComponent(noteId)}`, note);

