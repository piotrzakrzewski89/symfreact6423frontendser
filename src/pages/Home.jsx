import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import UserTable from '../components/UserTable';
import UserCreateModal from '../components/UserCreateModal';
import { getUsers, createUser } from '../api/users';

const Home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Błąd ładowania użytkowników ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      await fetchUsers(); // odśwież listę po dodaniu
      setModalOpen(false); // zamknij modal po sukcesie
    } catch (err) {
      console.error('Błąd przy tworzeniu użytkownika:', err.response?.data || err.message);
    }
  };

  return (
    <div className="mt-5 text-center">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Panel zarządzania użytkownikami
      </h2>
      <p>
        Witaj <strong>{user?.email}</strong>
      </p>
      <p>Twoje role: {user?.roles?.join(', ')}</p>

      <UserTable users={users} loading={loading} onCreateClick={() => setModalOpen(true)} />

      <UserCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};

export default Home;
