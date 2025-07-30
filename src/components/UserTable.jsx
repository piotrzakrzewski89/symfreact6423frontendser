import { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

const UserTable = ({ onCreateClick, users, loading }) => {
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'uuid', header: 'UUID' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'firstName', header: 'Imię' },
    { accessorKey: 'lastName', header: 'Nazwisko' },
    { accessorKey: 'createdAt', header: 'Utworzony', Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString() },
    { accessorKey: 'updatedAt', header: 'Zaktualizowany', Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleString() : '' },
    { accessorKey: 'deletedAt', header: 'Usunięty', Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleString() : '' },
    { accessorKey: 'lastLogin', header: 'Ostatnie logowanie', Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleString() : '' },
    { accessorKey: 'employeeNumber', header: 'Nr pracownika' },
    { accessorKey: 'roles', header: 'Role', Cell: ({ cell }) => cell.getValue().join(', ') },
    { accessorKey: 'isActive', header: 'Aktywny', Cell: ({ cell }) => (cell.getValue() ? '✅' : '❌') },
  ];

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
        enableColumnResizing
        enableColumnOrdering
        enableColumnFilters
        enableHiding // <-- pozwala użytkownikowi ukrywać/pokazywać kolumny
        initialState={{
          columnVisibility: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            uuid: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
            lastLogin: false,
            employeeNumber: true,
            roles: false,
            isActive: true,
          },
        }}
      />
    </Box>
  );
};

export default UserTable;
