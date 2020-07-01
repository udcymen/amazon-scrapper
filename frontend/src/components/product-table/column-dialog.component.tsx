import React from 'react';
import { Paper, GridListTile, FormControlLabel, Checkbox, GridList, Dialog, DialogTitle } from '@material-ui/core';
import { Column } from "../../common/types";
import { makeStyles } from '@material-ui/core/styles';


interface Props {
    columns: Column[];
    showColumnDialog: boolean;
    handleToggleCheckbox(column: Column): void;
    handleCloseColumnDialog(): void;
}

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
});

export const ColumnDialog: React.FC<Props> = ({ columns, showColumnDialog, handleToggleCheckbox, handleCloseColumnDialog }) => {
    const classes = useStyles();

    return (
        <Dialog
            className={classes.modal}
            open={showColumnDialog}
            onClose={handleCloseColumnDialog}
        >
            <DialogTitle id="column-dialog-title">Toggle Column Checkbox to Display/Hide Column</DialogTitle>
            <Paper className="container">
                <GridList cellHeight={40} cols={3}>
                    {columns.map((column: Column) => {
                        return (
                            <GridListTile key={column.id} cols={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!column.hidden}
                                            onChange={() => handleToggleCheckbox(column)}
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
        </Dialog>
    )
}