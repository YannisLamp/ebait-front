import React from 'react';

// Material
import { InputLabel, MenuItem, FormControl, Select, OutlinedInput, IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    grid: {
        height: '100%',
    },
    categories: {
        //marginBottom: theme.spacing(4),
    },
    categoryField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 180,
    },
    deleteDiv: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    delete: {
        color: 'rgb(220, 0, 78)',
    },
}));


export default function CategoryList(props) {

    const { categoryFields } = props;
    const { handleCategoryPick, deleteCategory } = props;

    // Some React hooks from material ui so that the outlined stuff work 
    // Not like the project's style, but it is more important for the component to be functional
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.categories}>
                <Grid container justify="flex-start">
                    {
                        categoryFields.map((field, level) => {
                            return (
                                <Grid item key={level}>
                                    <FormControl variant="outlined" className={classes.categoryField}>
                                        <InputLabel ref={inputLabel} htmlFor={'categories' + (level + 1)}>
                                            Category {level + 1}
                                        </InputLabel>
                                        <Select
                                            value={field.selectedIndex}
                                            onChange={e => { handleCategoryPick(e, level) }}
                                            input={<OutlinedInput
                                                style={{ backgroundColor: 'white' }}
                                                labelWidth={labelWidth}
                                                name="category"
                                                id={'categories' + (level + 1)}
                                            />}
                                        >
                                            {field.allCategories.map((cat, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={index}
                                                >
                                                    {cat.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            );
                        })
                    }
                    <Grid item>
                        <div className={classes.deleteDiv}>
                            <IconButton onClick={deleteCategory}>
                                <DeleteIcon className={classes.delete} />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}