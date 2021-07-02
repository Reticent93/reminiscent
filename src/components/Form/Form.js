import useStyles from './styles.js'
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";


const Form = ({currentId, setCurrentId}) => {
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const classes = useStyles()

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentId === 0) {
            dispatch(createPost({...postData, name: user?.result?.name }))

        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align={'center'}>
                    Please Sign In
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Reminiscing About '} a Memory</Typography>

                <TextField name='Title' variant='outlined' label='Title' fullWidth value={postData.title}
                           onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name='Message' variant='outlined' label='Message' fullWidth value={postData.message}
                           onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField name='Tags' variant='outlined' label='Tags' fullWidth value={postData.tags}
                           onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false}
                              onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit'
                        fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form

