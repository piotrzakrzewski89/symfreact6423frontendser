import axios from './axios';

export const createUser = async (userData) => {
    try {
        const res = await axios.post('/api/new-user', userData);
        return res.data; // zwróć wynik do komponentu
    } catch (err) {
        throw err; // przekaż błąd dalej do komponentu
    }
};

export const getUsers = async () => {
    try {
        const res = await axios.get('/api/list-users');
        return res.data;
    } catch (err) {
        throw err;
    }
};