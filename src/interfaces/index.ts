export interface Item {
    id: number | string;
    x: number;
    y: number;
    headerText: string;
    sql_query: string;
    bar_type: string;
    newTableSelected: string;
    top?: number;
    left?: number;
    width: number;
    minWidth: number | boolean;
    maxWidth: number | boolean;
    widthPx?: number;
    height: number;
    minHeight: number | boolean;
    maxHeight: number | boolean;
    heightPx?: number;
    draggable?: boolean;
    resizable?: boolean;
    moved?: boolean;
    locked?: boolean;
}

export interface customData {
    headerText: string;
    sql_query: string;
    bar_type: string;
}

export interface Breakpoint {
    name: string;
    numberOfCols: number;
    setpoint?: number;
}

export interface Margin {
    x: number;
    y: number;
}

export interface Subscription {
    id: number | string;
    unsubscribe: () => void;
}