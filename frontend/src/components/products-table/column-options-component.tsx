import React, { Component } from 'react';
import { ColumnOptionState } from '../../common/types';

class ColumnOptions extends Component<{ displayColumns: string[] }, ColumnOptionState> {
    
    state = {
        columns: ["Asin", "Price", "Brand", "Rank", "Display", "Ram", "CPU", "SSD", "HHD", "Model", "Keyboard", "DVD", 
        "Note", "Office", "OS", "Security", "UPC", "SKU", "Type", "Version", "Video Card"]
    }

    render(){
        return (
            <div>
            </div>
        )
    }
}

export default ColumnOptions;