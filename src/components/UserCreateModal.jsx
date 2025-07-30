import React, { useState } from 'react';
import {
    Box, Button, Modal, TextField, Checkbox, FormControlLabel, Typography, MenuItem
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const UserCreateModal = ({ open, onClose, onCreate }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '', 
        employeeNumber: '',
        isActive: 'true',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm(prev => ({ ...prev, [name]: checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onCreate(form);
        setForm({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            employeeNumber: '',
            isActive: 'true',
        });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby='creat-user-modal'>
            <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
                <Typography variant="h6" mb={2}>Utwórz nowego użytkownika</Typography>

                <TextField fullWidth label="Email *" name='email' type='email' value={form.email} onChange={handleChange} margin='normal' required />

                <TextField fullWidth label="Hasło *" name='password' type='password' value={form.password} onChange={handleChange} margin='normal' required />

                <TextField fullWidth label="Imię *" name='firstName' value={form.firstName} onChange={handleChange} margin='normal' required />

                <TextField fullWidth label="Nazwisko *" name='lastName' value={form.lastName} onChange={handleChange} margin='normal' required />

                <TextField fullWidth label="Numer Pracownika *" name='employeeNumber' value={form.employeeNumber} onChange={handleChange} margin='normal' required />

                <FormControlLabel control={
                    <Checkbox checked={form.isActive} onChange={handleChange} name='isActive' />

                }
                    label='Aktywny'
                />

                <Box mt={3} display='flex' justifyContent='flex-end' gap={2}>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button type='submit' variant='contained' color='primary'>Utwórz</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserCreateModal;
