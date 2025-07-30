import { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

const UserTable = ({onCreateClick }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'roles',
      header: 'Role',
      Cell: ({ cell }) => cell.getValue().join(', '),
    },
    {
      accessorKey: 'is_active',
      header: 'Aktywny',
      Cell: ({ cell }) => (cell.getValue() ? '✅' : '❌'),
    },
  ];

  useEffect(() => {
    fetch(`${API_URL}/api/list-users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista użytkowników
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={onCreateClick}>
          ➕ Utwórz nowego użytkownika
        </Button>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={users}
        state={{ isLoading: loading }}
      />
    </Box>
  );
};

export default UserTable;
