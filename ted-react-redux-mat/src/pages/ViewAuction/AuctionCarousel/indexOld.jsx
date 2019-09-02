import React from 'react';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    image: {
        // marginTop: theme.spacing(1),
        
        // width: 'auto',
        // maxWidth: '100%', 
        // //maxHeight: '40vh'
        // height: theme.spacing(20),
        // objectFit: 'contain',
        height: '400px'
    },
}));

export default function AuctionCarousel(props) {
    const { photos } = props;

    const classes = useStyles();
    return (
        <Carousel classname={classes.image}>
            {
                photos.map((photo, index) => {
                    return(
                        <div key={index}>
                            <img  src={photo.fileDownloadUri} />
                            {/* <p className="legend">Legend 1</p> */}
                        </div>
                    );
                })
            }
        </Carousel>
    );
}