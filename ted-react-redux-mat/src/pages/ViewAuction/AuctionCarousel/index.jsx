import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import Lightbox from 'react-image-lightbox';

import { Grid, Button } from '@material-ui/core';
//import AwsSliderStyles from 'react-awesome-slider/src/styles';
//import 'react-awesome-slider/dist/styles.css';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    image: {
        marginTop: theme.spacing(1),

        width: 'auto',
        maxWidth: '100%',
        //maxHeight: '40vh'
        height: theme.spacing(20),
        objectFit: 'contain',
    },
    slider: {
        marginBottom: theme.spacing(6),
    }
}));


export default function AuctionCarousel(props) {
    const { photos, isFullscreenPhotos, fullscreenIndex } = props;
    const { changeFullscreenPhotos, setFullscreenIndex } = props;

    const classes = useStyles();
    return (
        <>
            <Button onClick={changeFullscreenPhotos}>LALALALAL</Button>
            <AwesomeSlider
                className={classes.slider}
            //cssModule={AwsSliderStyles}
            >
                {
                    photos.map((photo, index) => {
                        return (
                            <div key={index} data-src={photo.fileDownloadUri} />
                        );
                    })
                }
            </AwesomeSlider>

            {
                isFullscreenPhotos && (
                    <Lightbox
                        mainSrc={photos[fullscreenIndex].fileDownloadUri}
                        nextSrc={photos[(fullscreenIndex + 1) % photos.length].fileDownloadUri}
                        prevSrc={photos[(fullscreenIndex + photos.length - 1) % photos.length].fileDownloadUri}
                        onCloseRequest={changeFullscreenPhotos}
                        onMovePrevRequest={() => setFullscreenIndex((fullscreenIndex + photos.length - 1) % photos.length)}
                        onMoveNextRequest={() => setFullscreenIndex((fullscreenIndex + 1) % photos.length)}
                        reactModalStyle={{overlay: {zIndex: 1500}}}
                    />
                )
            }

        </>
    );
}