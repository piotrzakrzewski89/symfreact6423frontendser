import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import UserTable from '../components/UserTable';
import UserCreateModal from '../components/UserCreateModal';
import { fetchUsers, createUser } from '../api/users';

const Home = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error('Błąd ładowania użytkowników ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="mt-5 text-center">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Panel zarządzania użytkownikami
      </h2>
      <p>
        Witaj <strong>{user?.email}</strong>
      </p>
      <p>Twoje role: {user?.roles?.join(', ')}</p>

      <UserTable
        onCreateClick={() => setModalOpen(true)}
        users={users}
        loading={loading}
      />
      <UserCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={ createUser }
      />
    </div>
  );
};

export default Home;
