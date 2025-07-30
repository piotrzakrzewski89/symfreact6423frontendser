import React from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const userSchema = yup.object().shape({
    email: yup.string().email('Niepoprawny email').required('Email jest wymagany'),
    password: yup
        .string()
        .required("Hasło jest wymagane")
        .min(8, "Hasło musi mieć co najmniej 8 znaków")
        .matches(/[a-z]/, "Hasło musi zawierać małą literę")
        .matches(/[A-Z]/, "Hasło musi zawierać wielką literę")
        .matches(/\d/, "Hasło musi zawierać cyfrę")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Hasło musi zawierać znak specjalny"),
    firstName: yup.string().required('Imię jest wymagane'),
    lastName: yup.string().required('Nazwisko jest wymagane'),
    employeeNumber: yup.string().required('Numer pracownika jest wymagany'),
    isActive: yup.boolean(),
});

const UserCreateModal = ({ open, onClose, onCreate }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            isActive: true,
        },
    });

    const password = watch('password', '');

    const passwordRequirements = [
        { label: "Mała litera", test: (pw) => /[a-z]/.test(pw) },
        { label: "Wielka litera", test: (pw) => /[A-Z]/.test(pw) },
        { label: "Cyfra", test: (pw) => /\d/.test(pw) },
        { label: "Znak specjalny", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
        { label: "Min. 8 znaków", test: (pw) => pw.length >= 8 },
    ];

    const onSubmit = (data) => {
        onCreate(data);
        reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="create-user-modal">
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Typography variant="h6" mb={2}>Utwórz nowego użytkownika</Typography>

                <TextField
                    fullWidth
                    label="Email *"
                    type="email"
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email")}
                />

                <TextField
                    fullWidth
                    label="Hasło *"
                    type="password"
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password")}
                />

                <Box mt={1}>
                    {passwordRequirements.map((rule, idx) => {
                        const isValid = rule.test(password);
                        return (
                            <Typography
                                key={idx}
                                variant="body2"
                                sx={{
                                    color: isValid ? "green" : "gray",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <span style={{ marginRight: 6 }}>
                                    {isValid ? "✔️" : "❌"}
                                </span>
                                {rule.label}
                            </Typography>
                        );
                    })}
                </Box>


                <TextField
                    fullWidth
                    label="Imię *"
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register("firstName")}
                />

                <TextField
                    fullWidth
                    label="Nazwisko *"
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register("lastName")}
                />

                <TextField
                    fullWidth
                    label="Numer Pracownika *"
                    margin="normal"
                    error={!!errors.employeeNumber}
                    helperText={errors.employeeNumber?.message}
                    {...register("employeeNumber")}
                />

                <FormControlLabel
                    control={<Checkbox {...register('isActive')} defaultChecked />}
                    label="Aktywny"
                />

                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Utwórz
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserCreateModal;