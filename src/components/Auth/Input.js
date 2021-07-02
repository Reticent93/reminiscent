import React from 'react';
import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import  VisibilityOff  from "@material-ui/icons/VisibilityOff";
import Visibility  from '@material-ui/icons/Visibility'

const Input = ({half, name, handleChange, label, autoFocus, handlePassword, type}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField name={name} onChange={handleChange} variant={'outlined'} required fullWidth label={label}
                       autoFocus={autoFocus} type={type} InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <IconButton onClick={handlePassword}>
                            {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            } : null
            }/>
        </Grid>
    );
}

export default Input;