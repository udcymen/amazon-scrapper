export interface Product {
    readonly "id": string;
    "price": number;
    "asin": string;
    "rank": number;
    "link": string;
    "brand": string;
    "model": string;
    "cpu": string;
    "screen": string;
    "ram": string;
    "vc": string
    "ssd": string;
    "hhd": string;
    "type": string;
    "os": string;
    "dvd": boolean;
    "backlit": boolean;
    "security": boolean;
    "office": boolean;
    "upc": string;
    "sku": string;
    "note": string;
    "version": number;
}

export interface AppState {
    products: Product[];
}

export interface ProductTableState {
    displayProducts: Product[];
    displayColumns: string[];
    activePage: number;
    totalPages: number | null;
    totalItemsCount: number | null;
    itemsCountPerPage: number | null;
    showColumnOptions: boolean;
}

export interface ColumnOptionState {
    columns: string[];
}