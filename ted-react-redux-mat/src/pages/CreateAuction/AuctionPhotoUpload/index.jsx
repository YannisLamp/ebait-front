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
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));


export default function AuctionPhotoUpload(props) {

    const { photos, shownPhoto } = props;
    const { onPhotoAddition, selectShownPhoto, onPhotoDelete } = props;
    const style = { height: '400px' };

    //console.log(photos[shownPhoto]);

    const classes = useStyles();
    return (
        <div>

            <PaperTitle
                title='Upload Photos'
                suggestion={'optionally upload a maximum of two photos of your item'}
            />

            <Grid container direction="column" justify="space-between">
                {/* <Grid item> */}
                    {
                        photos.length > 0 ? (<img style={{ maxWidth: '100%', maxHeight: '40vh' }} src={URL.createObjectURL(photos[shownPhoto])} />) : ''
                    }
                {/* </Grid> */}

                {/* <Grid item> */}
                <List dense>
                    {
                        photos.map((photo, index) => {
                            console.log(photo);
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
                                        primary={photo.name}
                                        //secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={e => {onPhotoDelete(index)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })
                    }
                </List>


                <Grid container justify="flex-end">
                    <input
                        //accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onPhotoAddition}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button} >
                            Upload
                        </Button>
                    </label>
                </Grid>






                {/* </Grid> */}

            


            </Grid>

        </div>
    );
}