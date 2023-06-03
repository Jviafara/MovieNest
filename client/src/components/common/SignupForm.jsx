import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';

const SignupForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();

    const [isSingUpRequest, setIsSingUpRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signupForm = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            username: '',
            displayName: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, 'username minimum 8 characters')
                .required('username required'),
            displayName: Yup.string()
                .min(8, 'display name minimum 8 characters')
                .required('display name required'),
            password: Yup.string()
                .min(8, 'password minimum 8 characters')
                .required('password required'),
            confirmPassword: Yup.string()
                .min(8, 'password minimum 8 characters')
                .required('confirm password required'),
        }),
        onSubmit: async (values) => {
            setErrorMessage(undefined);
            setIsSingUpRequest(true);
            const { response, err } = await userApi.signup(values);
            setIsSingUpRequest(false);

            if (response) {
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success('Sign up success');
            }
            if (err) setErrorMessage(err.message);
        },
    });

    return (
        <Box component="form" onSubmit={signupForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="display name"
                    name="displayName"
                    value={signupForm.values.displayName}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={
                        signupForm.touched.displayName &&
                        signupForm.errors.displayName !== undefined
                    }
                    helperText={
                        signupForm.touched.displayName &&
                        signupForm.errors.displayName
                    }
                />
                <TextField
                    type="text"
                    placeholder="username"
                    name="username"
                    value={signupForm.values.username}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={
                        signupForm.touched.username &&
                        signupForm.errors.username !== undefined
                    }
                    helperText={
                        signupForm.touched.username &&
                        signupForm.errors.username
                    }
                />
                <TextField
                    type="password"
                    placeholder="password"
                    name="password"
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={
                        signupForm.touched.password &&
                        signupForm.errors.password !== undefined
                    }
                    helperText={
                        signupForm.touched.password &&
                        signupForm.errors.password
                    }
                />
                <TextField
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={signupForm.values.confirmPassword}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={
                        signupForm.touched.confirmPassword &&
                        signupForm.errors.confirmPassword !== undefined
                    }
                    helperText={
                        signupForm.touched.confirmPassword &&
                        signupForm.errors.confirmPassword
                    }
                />
            </Stack>
            <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: 4 }}
                loading={isSingUpRequest}>
                Sigin Up
            </LoadingButton>
            <Button
                fullWidth
                sx={{ marginTop: 1 }}
                onClick={() => switchAuthState()}>
                Sign In
            </Button>

            {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                    <Alert severity="error" variant="outlined">
                        {errorMessage}
                    </Alert>
                </Box>
            )}
        </Box>
    );
};

export default SignupForm;
