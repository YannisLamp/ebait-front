import React from 'react';

import { List, ListItem, ListItemAvatar, Avatar, Button, ListItemText, ListItemSecondaryAction, IconButton, Grid } from '@material-ui/core';

//import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoIcon from '@material-ui/icons/Photo';

import { makeStyles } from '@material-ui/core/styles';

//import OpenStreetMap from '../../../sharedComp/OpenStreetMap';


import PaperTitle from '../../../sharedComp/PaperTitle';
//import ContainerDimensions from 'react-container-dimensions';


const useStyles = makeStyles(theme => ({
    textField: {
        width: '50%',
    },
    mapTitle: {
        marginTop: theme.spacing(2),
    },
    image: {
        marginTop: theme.spacing(1),
        
        width: 'auto',
        maxWidth: '100%', 
        //maxHeight: '40vh'
        height: theme.spacing(40),
        objectFit: 'contain',
    },
    // photoList: {
    //     marginTop: theme.spacing(50),
    // },
    button: {
        margin: theme.spacing(1),
    },
    onlyButton: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(10),
    },
    input: {
        display: 'none',
    },
    delete: {
        color: 'rgb(220, 0, 78)',
    },
}));


export default function AuctionPhotoUpload(props) {

    const { photos, shownPhoto } = props;
    const { onPhotoAddition, selectShownPhoto, onPhotoDelete } = props;

    const classes = useStyles();
    return (
        <div>

            <PaperTitle
                title='Upload Photos'
                suggestion={'optionally upload photos of your item'}
            />

            <Grid container direction="column" justify="space-between">
                {/* <Grid item> */}
                    {
                        photos.length > 0 ?
                            photos[shownPhoto].fileDownloadUri ? (
                                <img className={classes.image} src={photos[shownPhoto].fileDownloadUri} alt={""}/>
                            ) : (
                                <img className={classes.image} src={URL.createObjectURL(photos[shownPhoto])} alt={""}/>
                            )
                        : ''
                    }
                {/* </Grid> */}

                {/* <Grid item> */}
                <List
                    //className={classes.photoList}
                    dense
                >
                    {
                        photos.map((photo, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={e => { selectShownPhoto(index) }}
                                >

                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhotoIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={photo.fileName ? photo.fileName : photo.name}
                                        //secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={e => {onPhotoDelete(index)}}>
                                            <DeleteIcon className={classes.delete} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })
                    }
                </List>


                <Grid container justify="center">
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onPhotoAddition}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={photos.length > 0 ? classes.button : classes.onlyButton} >
                            Upload
                        </Button>
                    </label>
                </Grid>






                {/* </Grid> */}

            


            </Grid>

        </div>
    );
}