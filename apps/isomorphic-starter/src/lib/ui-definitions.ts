import { FactureItemMagasin, FactureItemService } from "./definitions";

export interface ISectionProps {
    title?: string;
    titleClassName?: string;
    className?: string;
}

export interface IStatCardProps {
    id?: number,
    icon: React.ReactNode,
    title: string,
    metric: string,
}
export interface IStatIdkelProps {
    id?: number,
    icon: React.ReactNode,
    title: string,
    metric: number,
    color?: string,
}
export interface IIdkelAccountCardProps {
    title: string;
    icon: JSX.Element;
    solde: number;
    attending?: number | undefined;
    className?: string;
    actions?: JSX.Element
}
export interface ILoadingStateCollection {
    [key: string]: ILoadingState
}
export interface ILoadingState {
    isLoading: boolean;
    error: boolean;
}
export interface INewSubAccountProps {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    type: string,
    setSubAccounts: React.Dispatch<React.SetStateAction<any>>,
    setDisplayedSubAccounts: React.Dispatch<React.SetStateAction<any>>,
}

export interface ICreateItemProps {
    setButton: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    newItem: any;
    setNewItem: React.Dispatch<React.SetStateAction<any>>;
}

export interface ICreateItemServiceProps extends ICreateItemProps {
    services: FactureItemService[];
}

export interface ICreateItemMaterielProps extends ICreateItemProps {
    magasins: FactureItemMagasin[];
}

export interface IModalProps {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface INewDevisItemProps extends IModalProps {
    services: FactureItemService[],
    magasins: FactureItemMagasin[],
    items: any[],
    setItems: (items: any[]) => void
}

export interface INewCustomerProps extends IModalProps {
    customers: any[],
    setCustomers: React.Dispatch<React.SetStateAction<any[]>>,
    setCustomerId: React.Dispatch<React.SetStateAction<number | null>>,
}