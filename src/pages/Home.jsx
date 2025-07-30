import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import UserTable from '../components/UserTable';
import UserCreateModal from '../components/UserCreateModal';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  const handleCreateUser = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/api/new-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        console.error('Błąd przy tworzeniu użytkownika');
        return;
      }

      await fetchUsers(); // <- odśwież listę
      setModalOpen(false); // <- zamknij modal po sukcesie
    } catch (err) {
      console.error('Błąd sieci:', err);
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

      <UserTable onCreateClick={openModal} />
      <UserCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};

export default Home;
