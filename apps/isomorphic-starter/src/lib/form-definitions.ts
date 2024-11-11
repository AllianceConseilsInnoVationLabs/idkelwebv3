export type LoginFormState =
    | {
        errors?: {
            email?: string[],
            password?: string[],
        },
        message?: string
    }
    | undefined

export type NewSubAccountForm = 
    | {
        errors?: {
            libelle?: string[],
            solde?: string[],
        },
        message?: string
        compte_type?: string
    }
    | undefined
    
export type ProvisionSubAccountForm = 
    | {
        errors?: {
            montant?: string[],
            compte?: string[],
        },
        message?: string
    }
    | undefined
    
export type CreateCustomerForm = 
    | {
        errors?: {
            nom?: string[],
            email?: string[],
            telephone?: string[],
        },
        message?: string
    }
    | undefined
    
export type CreateDevisForm = 
    | {
        errors?: {
            numero?: string[],
            payment_method?: string[],
            emission?: string[],
            echeance?: string[],
            customer?: string[],
        },
        message?: string
    }
    | undefined
    
export type WithdrawDevisForm = 
    | {
        errors?: {
            devis_id?: string[],
            montant?: string[],
            checkdate?: string[],
            compte?: string[],
        },
        message?: string
    }
    | undefined
    
export type CreateEncaissementForm = 
    | {
        errors?: {
            intutle?: string[],
            montant?: string[],
            facturedate?: string[],
            checkdate?: string[],
            customer?: string[],
            compte?: string[],
            service?: string[],
            sellmode?: string[],
            partial?: string[],
        },
        message?: string
    }
    | undefined

export type CreateSubOperationForm = 
    | {
        errors?: {
            montant?: string[],
            checkdate?: string[],
            compte?: string[],
        },
        message?: string
    }
    | undefined