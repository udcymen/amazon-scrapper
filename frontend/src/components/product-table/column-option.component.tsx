import React, { Component } from 'react';
import { Paper, GridListTile, FormControlLabel, Checkbox, GridList } from '@material-ui/core';
import { Column } from "../../common/types";


interface InjectedProps {
    columns: Column[];
    handleCheckBoxToggle(column: Column): void;
}

class ColumnOption extends Component<InjectedProps> {
    render() {
        return (
            <Paper className="container">
                <GridList cellHeight={40} cols={3}>
                    {this.props.columns.map((column: Column) => {
                        return (
                            <GridListTile key={column.id} cols={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!column.hidden}
                                            onChange={() => this.props.handleCheckBoxToggle(column)}
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
}

export default ColumnOption;