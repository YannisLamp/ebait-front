import React from 'react';

// Material
import { InputLabel, MenuItem, FormControl, Select, Input, Chip, OutlinedInput } from '@material-ui/core';

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
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: '15%',
    },
}));


export default function CategoryList(props) {

    const { categoryFields } = props;
    const { handleCategoryPick } = props;

    //Some React hook magic from material ui so that the outlined stuff work
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            
            <div className={classes.categories}>
            {
                categoryFields.map((field, level) => {
                    return (
                        <FormControl variant="outlined" className={classes.categoryField} key={level}>
                            <InputLabel ref={inputLabel} htmlFor={'categories' + (level + 1)}>
                                Category {level + 1}
                            </InputLabel>
                            <Select
                                value={field.selectedIndex}
                                onChange={e => { handleCategoryPick(e, level) }}
                                input={<OutlinedInput
                                    style={{backgroundColor: 'white'}}
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
                    );
                })
            }
            </div>

        </div>
    );
}