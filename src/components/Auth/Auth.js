import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import useStyles from './styles'
import LockOutlined from "@material-ui/icons/LockOutlined";
import Input from './Input'


const Auth = () => {
    // const state = null
    const classes = useStyles()

    const [isSignup, setIsSignup] = useState(false)

    const [password, setPassword] = useState(false)

    const handlePassword = () => setPassword((prePassword) => !prePassword)

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) =>!prevIsSignup )
        handlePassword(false)
    }

    return (
        <Container component={'main'} maxWidth={"xs"}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant={'h5'}>{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>

                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>

                            </>
                        )}
                        <Input name={'email'} label={'Email Address'} handleChange={handleChange} type={'email'}/>
                        <Input name={'password'} label={'Password'} handleChange={handleChange}
                               type={password ? 'text' : 'password'} handlePassword={handlePassword}/>
                        {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange}
                                            type={'password'}/>}
                    </Grid>
                    <Button type={'submit'} fullWidth variant={"contained"} color={'primary'}
                            className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
                    <Grid container justify={'flex-end'}>
                        <Grid item>
                            <Button
                                onClick={switchMode}>{isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;