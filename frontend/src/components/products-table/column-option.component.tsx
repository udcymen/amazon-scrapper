import React, { Component } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

interface ColumnOptionState {
    allColumns: string[];
}

interface InjectedProps {
    displayColumns: string[];
    handleCheckBoxToggle(name: string): void;
}

class ColumnOption extends Component<InjectedProps, ColumnOptionState> {
    state: ColumnOptionState = {
        allColumns: [
            "ASIN", "Price", "Brand", "Rank", "Display", "Ram", "CPU", "SSD", "HHD", "Model", "Keyboard",
            "DVD", "Note", "Office", "OS", "Security", "UPC", "SKU", "Type", "Version", "Video Card"
        ]
    }

    render() {
        return (
            <div>
                <FormControl component="fieldset" className="formControl">
                    <FormLabel component="legend">Select Columns that You want to Display</FormLabel>
                    <FormGroup>
                        {this.state.allColumns.map((column:  string) => {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.props.displayColumns.includes(column)}
                                            onChange={() => this.props.handleCheckBoxToggle(column)}
                                        />
                                    }
                                    label={column}
                                    key={column}
                                />
                            )
                        })}
                    </FormGroup>
                </FormControl>
            </div>
        )
    }
}

export default ColumnOption;