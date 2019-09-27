import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import Lightbox from 'react-image-lightbox';
import OpenWithIcon from '@material-ui/icons/OpenWith';

import { IconButton } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    carouselContainer: {
        position: 'relative'
    },
    slider: {
        width: 'auto',
        maxWidth: '100%',
        //maxHeight: '40vh'
        height: theme.spacing(43),
        //height: 'auto',
        marginBottom: theme.spacing(6),
        objectFit: 'contain',
    },
    shit: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex:1100,
    }
}));

export default function AuctionCarousel(props) {
    const { photos, isFullscreenPhotos, fullscreenIndex } = props;
    const { changeFullscreenPhotos, setFullscreenIndex } = props;

    const classes = useStyles();
    return (
        <>
            <div className={classes.carouselContainer}>
                <AwesomeSlider
                    className={classes.slider}
                >
                    {
                        photos.map((photo, index) => {
                            return (
                                <div key={index} data-src={photo.fileDownloadUri} onClick={changeFullscreenPhotos} />
                            );
                        })
                    }
                </AwesomeSlider>
                <IconButton className={classes.shit} onClick={changeFullscreenPhotos}><OpenWithIcon /></IconButton>
            </div>

            {
                isFullscreenPhotos && (
                    <Lightbox
                        mainSrc={photos[fullscreenIndex].fileDownloadUri}
                        nextSrc={photos[(fullscreenIndex + 1) % photos.length].fileDownloadUri}
                        prevSrc={photos[(fullscreenIndex + photos.length - 1) % photos.length].fileDownloadUri}
                        onCloseRequest={changeFullscreenPhotos}
                        onMovePrevRequest={() => setFullscreenIndex((fullscreenIndex + photos.length - 1) % photos.length)}
                        onMoveNextRequest={() => setFullscreenIndex((fullscreenIndex + 1) % photos.length)}
                        reactModalStyle={{ overlay: { zIndex: 1500 } }}
                    />
                )
            }

        </>
    );
}