import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from 'react-router-dom'
import memories from "../../images/memories.png";
import useStyles from './styles.js'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'


const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()


    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <AppBar position="static" className={classes.appBar} color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2"
                            align="center">Reminisce</Typography>
                <img className={classes.image} src={memories} alt="icon" height='60'/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant={'h6'}>
                            {user.result.name}
                        </Typography>
                        <Button className={classes.logout} variant={'contained'} color={'secondary'} onClick={logout}>
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant={'contained'} color={'primary'}>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )

}

export default Navbar;