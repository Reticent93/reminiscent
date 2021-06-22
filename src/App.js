import {Container, AppBar, Typography, Grid, Grow} from "@material-ui/core";
import memories from './images/memories.png'
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import  {useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import {getPosts} from "./actions/posts";
import useStyles from './styles.js'


const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId,dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar position="static" className={classes.appBar} color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Reminisce</Typography>
                <img className={classes.image} src={memories} alt="icon" height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>

    );
}

export default App;


