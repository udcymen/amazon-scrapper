import React, { useState, useEffect, useRef } from 'react';
import { Product, Column } from '../../common/types';
import axios from 'axios';
import { ColumnDialog } from './column-dialog.component';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, AppBar, Toolbar, Input } from '@material-ui/core';
import { makeStyles, createStyles, Theme, fade } from '@material-ui/core/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            flexGrow: 1,
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginLeft: theme.spacing(5),
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRoot: {
            color: 'inherit'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%'
        },
    }),
);

export const ProductTable: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [columns, setColumns] = useState<Column[]>(
        [
            {
                id: 'id',
                label: 'ID',
                hidden: false,
                minWidth: 100,
                order: 'desc'
            },
            {
                id: 'price',
                label: 'Price',
                hidden: false,
                minWidth: 100,
                order: false,
                format: (value: number) => value.toFixed(2),
            },
            {
                id: 'asin',
                label: 'ASIN',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'rank',
                label: 'Rank',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'brand',
                label: 'Brand',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'model',
                label: 'Model',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'cpu',
                label: 'CPU',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'ram',
                label: 'RAM',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'type',
                label: 'Category',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'screen',
                label: 'Screen',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'vc',
                label: 'Video Card',
                hidden: true,
                minWidth: 150,
                order: false,
            },
            {
                id: 'hhd',
                label: 'HHD',
                hidden: true,
                minWidth: 150,
                order: false,
            },
            {
                id: 'ssd',
                label: 'SSD',
                hidden: true,
                minWidth: 150,
                order: false,
            },
            {
                id: 'dvd',
                label: 'DVD',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'backlit',
                label: 'Backlit',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'security',
                label: 'Security',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'office',
                label: 'Office',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'upc',
                label: 'UPC',
                hidden: true,
                minWidth: 200,
                order: false,
            },
            {
                id: 'sku',
                label: 'SKU',
                hidden: true,
                minWidth: 200,
                order: false,
            },
            {
                id: 'note',
                label: 'Note',
                hidden: true,
                minWidth: 200,
                order: false,
            },
            {
                id: 'version',
                label: 'Version',
                hidden: true,
                minWidth: 100,
                order: false,
            }
        ]
    );
    const [activePage, setActivePage] = useState<number>(0);
    const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
    const [itemsCountPerPage, setItemsCountPerPage] = useState<number>(10);
    const [showColumnDialog, setshowColumnDialog] = useState<boolean>(false);
    const [searchTerms, setSearchTerms] = useState<string>("");

    const ItemsCountPerPage = [10, 25, 50, 100];

    const searchInputRef = useRef<HTMLInputElement>(null);

    const classes = useStyles();

    useEffect(() => {
        fetchProducts();
    }, [activePage, itemsCountPerPage, searchTerms, JSON.stringify(columns)]);

    function fetchProducts() {
        let sortString: string = "";

        columns.forEach((column: Column) => {
            if (!column.hidden && column.order !== false) {
                sortString += `&sort=${column.id},${column.order}`
            }
        });

        let requestUrl: string = `http://localhost:8080/products?page=${activePage}&size=${itemsCountPerPage}${sortString}&searchTerms=${searchTerms}`;

        console.log("GET Products");
        console.log(requestUrl);

        axios.get(requestUrl)
            .then(response => {
                setProducts(response.data.content);
                setTotalItemsCount(response.data.totalElements);
            })
            .catch((err: Error) => {
                console.log(err);
                setProducts([]);
                setTotalItemsCount(0);
            });
    };

    function getValueFromProduct(product: Product, prop: string): any {
        let result = null;
        switch (prop) {
            case "ID": {
                result = product.id;
                break;
            }
            case "ASIN": {
                result = product.asin;
                break;
            }
            case "Price": {
                result = product.price;
                break;
            }
            case "Brand": {
                result = product.brand;
                break;
            }
            case "Rank": {
                result = product.rank;
                break;
            }
            case "Display": {
                result = product.screen;
                break;
            }
            case "Ram": {
                result = product.ram;
                break;
            }
            case "CPU": {
                result = product.cpu;
                break;
            }
            case "SSD": {
                result = product.ssd;
                break;
            }
            case "HHD": {
                result = product.hhd;
                break;
            }
            case "Model": {
                result = product.model;
                break;
            }
            case "Keyboard": {
                result = product.backlit;
                break;
            }
            case "DVD": {
                result = product.dvd;
                break;
            }
            case "Note": {
                result = product.note;
                break;
            }
            case "Office": {
                result = product.office;
                break;
            }
            case "OS": {
                result = product.os;
                break;
            }
            case "Security": {
                result = product.security;
                break;
            }
            case "UPC": {
                result = product.upc;
                break;
            }
            case "SKU": {
                result = product.sku;
                break;
            }
            case "Type": {
                result = product.type;
                break;
            }
            case "Video Card": {
                result = product.vc;
                break;
            }
            case "Version": {
                result = product.version;
                break;
            }
            default: {
                result = "";
                break;
            }
        }
        return result;
    }

    function handleToggleCheckbox(column: Column): void {
        column.hidden = !column.hidden;
        // const newColumns = columns;
        // const columnsIndex = newColumns.indexOf(column);
        // newColumns[columnsIndex].hidden = !newColumns[columnsIndex].hidden
        // setColumns(newColumns);
    }

    function handleChangePage(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) {
        setActivePage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setItemsCountPerPage(+event.target.value);
    }

    function handleOpenColumnDialog() {
        setshowColumnDialog(true);
    }

    function handleCloseColumnDialog() {
        setshowColumnDialog(false);
    }

    function handleSearchEnterPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter"){
            setSearchTerms(searchInputRef.current ? searchInputRef.current?.value : "");
        }
    }

    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <Button variant="contained" color="secondary" onClick={handleOpenColumnDialog}>
                        Columns
                    </Button>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <Input
                            type="text"
                            fullWidth={true}
                            inputRef={searchInputRef}
                            placeholder="Search Products by Brand, Model, Screen, CPU, RAM or Category..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search products' }}
                            onKeyPress={handleSearchEnterPress}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <ColumnDialog
                columns={columns}
                showColumnDialog={showColumnDialog}
                handleToggleCheckbox={handleToggleCheckbox}
                handleCloseColumnDialog={handleCloseColumnDialog}
            />
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns
                                .filter((column: Column) => !column.hidden)
                                .map((column: Column) => {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <>
                                                {column.label}
                                                {column.order
                                                    ? (<a href="">
                                                        {column.order === "asc"
                                                            ? <KeyboardArrowUp />
                                                            : <KeyboardArrowDown />}
                                                    </a>)
                                                    : null
                                                }
                                            </>
                                        </TableCell>
                                    )
                                })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .map((product: Product) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={product.asin}>
                                        {columns
                                            .filter((column: Column) => !column.hidden)
                                            .map((column: Column) => {
                                                const value = getValueFromProduct(product, column.label);
                                                return (
                                                    <TableCell key={product.asin + column.id} align={column.align}>
                                                        {column.format && value
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={ItemsCountPerPage}
                component="div"
                count={totalItemsCount}
                rowsPerPage={itemsCountPerPage}
                page={activePage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );

}

export default ProductTable;