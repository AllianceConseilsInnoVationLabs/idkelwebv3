import { SelectOption } from "rizzui";
import { EncaissementHistoryItem, FactureChargeItem, FactureFournisseurItem, FactureItemMagasin, FactureItemService } from "./definitions";

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
    setButton?: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    newItem?: any;
    setNewItem?: React.Dispatch<React.SetStateAction<any>>;
}

export interface ICreateItemServiceProps extends ICreateItemProps {
    services: FactureItemService[];
    setServiceOrStockGood?: React.Dispatch<React.SetStateAction<boolean>>;
    service?: SelectOption | null,
    setService?: React.Dispatch<React.SetStateAction<SelectOption | null>>;
}

export interface ICreateItemMaterielProps extends ICreateItemProps {
    magasins: FactureItemMagasin[];
    setServiceOrStockGood?: React.Dispatch<React.SetStateAction<boolean>>;
    magasin?: SelectOption | null,
    setMagasin?: React.Dispatch<React.SetStateAction<SelectOption | null>>;
    stock?: SelectOption | null,
    setStock?: React.Dispatch<React.SetStateAction<SelectOption | null>>;
    state?: any;
}

export interface IModalProps {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title?: string,
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

export interface INewWithdrawProps extends IModalProps {
    subAccounts: any[],
    devis: any | null,
    setDevis: React.Dispatch<React.SetStateAction<any | null>>,
    refreshData: () => void
}

export interface INewOperationProps{
    subAccounts: any[],
    tvas: any[],
    regime: string,
    refreshData: () => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface INewEncaissementProps extends INewOperationProps {
    services: FactureItemService[],
    magasins: FactureItemMagasin[],
    customers: any[],
    produits: any[],
}

export interface INewDecaissementsProps extends INewOperationProps {
    fournisseurs: FactureFournisseurItem[],
    charges: FactureChargeItem[],
}

export interface INewOperationModalProps extends IModalProps, INewEncaissementProps, INewDecaissementsProps {
    operation: string,
}

export interface IHistoryOperationProps extends IModalProps {
    accounts: any[],
    historyData: EncaissementHistoryItem[],
    
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}