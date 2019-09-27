import React from 'react';

// Material
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 180,
    },

}));


export default function AuctionFilters(props) {
    const { description, lowestPrice, highestPrice, location, order, orderBy } = props;
    const { handleChange, refreshAuctions } = props;

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container item justify="space-between">
                <Grid item>
                    <TextField
                        className={classes.textField}
                        label="Item Description"
                        name="description"
                        value={description}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                    <TextField
                        className={classes.textField}
                        label="Lowest Price"
                        name="lowestPrice"
                        value={lowestPrice}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                    <TextField
                        className={classes.textField}
                        label="Highest Price"
                        name="highestPrice"
                        value={highestPrice}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                    <TextField
                        className={classes.textField}
                        label="Location"
                        name="location"
                        value={location}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                </Grid>

                <Grid item>
                    <FormControl variant="outlined" className={classes.textField}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-order-by">
                            Order By
                        </InputLabel>
                        <Select
                            value={orderBy}
                            onChange={handleChange}
                            onBlur={refreshAuctions}
                            input={<OutlinedInput
                                style={{ backgroundColor: 'white' }}
                                labelWidth={labelWidth}
                                name="orderBy"
                                id={"outlined-order-by"}
                            />}
                        >
                            <MenuItem value="name">
                                <em>Name</em>
                            </MenuItem>
                            <MenuItem value="description">Description</MenuItem>
                            {/* <MenuItem value={20}></MenuItem> */}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.textField}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-order">
                            Order
                        </InputLabel>
                        <Select
                            value={order}
                            onChange={handleChange}
                            onBlur={refreshAuctions}
                            input={<OutlinedInput
                                style={{ backgroundColor: 'white' }}
                                labelWidth={labelWidth}
                                name="order"
                                id={"outlined-order"}
                            />}
                        >
                            <MenuItem value={'asc'}>Ascending</MenuItem>
                            <MenuItem value={'desc'}>Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}