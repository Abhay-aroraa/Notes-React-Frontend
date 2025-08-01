import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAuthToken = () =>{
   let data = localStorage.getItem("token");
   return data;
}

export const getAllNotes = () =>
  axios.get(`${BASE_URL}/note`, getAuthHeader());

export const createNote = (note) =>
  axios.post(`${BASE_URL}/note`, note, getAuthHeader());

export const deleteNote = (noteId) =>
  axios.delete(`${BASE_URL}/note/id/${encodeURIComponent(noteId)}`, getAuthHeader());

export const updateNote = (noteId, note) =>
  axios.put(`${BASE_URL}/note/id/${encodeURIComponent(noteId)}`, note, getAuthHeader());

export const pinUnpinNotes = (noteId) =>
  axios.put(`${BASE_URL}/note/pin/${encodeURIComponent(noteId)}`, {}, getAuthHeader());

export const archieveNotes = (noteId) =>
  axios.put(`${BASE_URL}/note/archieve/${encodeURIComponent(noteId)}`, {}, getAuthHeader());

export const trashNotes = (noteId) =>
  axios.put(`${BASE_URL}/note/trash/${encodeURIComponent(noteId)}`, {}, getAuthHeader());

export const updateNoteColor = (noteId, color) =>
  axios.put(
    `${BASE_URL}/note/color/${encodeURIComponent(noteId)}`,
    { color },
    {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        "Content-Type": "application/json",
      },
    }
  );

export const login = (email, password) => {
  return axios.post(`${BASE_URL}/api/auth/login`, { email, password }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const register = (email, password) => {
  return axios.post(`${BASE_URL}/api/auth/register`, {
    email,
    password,
    role: "USER",
  });
};

export const sendotp = (email) => {
  const data = new URLSearchParams();
  data.append('email', email);

  return axios.post(`${BASE_URL}/api/auth/send-otp`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const resetPassword = (email, otp, newPassword) => {
  const data = new URLSearchParams();
  data.append('email', email);
  data.append('otp', otp);
  data.append('newPassword', newPassword);

  return axios.post(`${BASE_URL}/api/auth/reset-password`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const getAIResponse = async (prompt) => {
  try {
    const res = await fetch("http://localhost:8080/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.response;
  } catch (err) {
    console.error("AI Error:", err);
    return "Something went wrong while contacting AI.";
  }
};



