import React from 'react';
import { Paper, GridListTile, FormControlLabel, Checkbox, GridList, Dialog, DialogTitle } from '@material-ui/core';
import { Column } from "../../common/types";
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


interface Props {
    columns: Column[];
    handleCheckBoxToggle(column: Column): void;
}

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

export const ColumnDialog: React.FC<Props> = ({ columns ,handleCheckBoxToggle }) => {
    const classes = useStyles();

    return (
        <Paper className="container">
            <GridList cellHeight={40} cols={3}>
                {columns.map((column: Column) => {
                    return (
                        <GridListTile  key={column.id} cols={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!column.hidden}
                                        onChange={() => handleCheckBoxToggle(column)}
                                    />
                                }
                                label={column.label}
                                key={column.id}
                            />
                        </GridListTile>
                    );
                })}
            </GridList>
        </Paper>
    )
}