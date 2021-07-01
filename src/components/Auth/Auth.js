import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import useStyles from './styles'
import LockOutlined from "@material-ui/icons/LockOutlined";
import Input from './Input'


const Auth = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSignup, setIsSignup] = useState(false)

    const [password, setPassword] = useState(false)

    const handlePassword = () => setPassword((prePassword) => !prePassword)

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }

    const googleSuccess = async (res) => {
       const result = res?.profileObj; //?. says undefined if it cannot find value and not throw an error
        const token = res?.tokenId

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            history.push('/')
        }catch (e) {
console.error(e)
        }

    }

    const googleFailure = () => {
        console.error('Google Sign In was unsuccessful. Please try again later')
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
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
                    <GoogleLogin clientId='721800583414-l5hhnbecvj4b3lakn8durcvgrtvug4ci.apps.googleusercontent.com' render={(renderProps) => (
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick}
                                disabled={renderProps.disabled} startIcon={<Icon/>} variant={'contained'}>Google Sign
                            In</Button>)} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy={'single_host_origin'}
                    />
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