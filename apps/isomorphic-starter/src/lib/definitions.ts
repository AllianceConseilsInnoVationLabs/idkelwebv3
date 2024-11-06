


export type User = {
    id: number,
    name: string,
    email: string,
    telephone: string,
    active: number,
    image: null | string,
    user_type: string
}

export type Client = {
    active: number,
    activite_principale: null | string,
    activite_secondaire: null | string,
    add_geographique: null | string,
    add_postal: null | string,
    created_at: null | string,
    dateDebutActivite: null | string,
    email: string,
    forme_juridique: null | string,
    id: number,
    id_pay: string,
    ncc: string,
    nom: string,
    nom_dirigeant: null | string,
    numero_compte: null | string,
    numero_ntd: null | string,
    pays_id: number,
    rccm: string,
    regime: null | string,
    regime_imposition: string,
    secteur_id: number, 
    siege_social: null | string,
    siteweb_url: null | string,
    tel: null | string,
    type: string,
    updated_at: string,
    url_img : null | string,
    whatsapp: null | string,
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
}

export type Transaction = {
    id: number,
    orderId: string,
    libelle: string,
    type: "recharge" | "paiement" | "envoi",
    montant: string | number,
    date: string,
    destination: string,
    provenance: string,
    statut: string,
    nouveau_solde: string | number,
    frais: string | number,
    client_id: number,
    operateur: string
    created_at: string,
    updated_at: string
}

export type FactureItemService = {
    id: number,
    nom_service: string,
    slug: string,
    client_id: number,
    created_at: string,
    updated_at: string
}

export type FactureItemProduit = {
    id: number,
    nom_produit: string,
    description_produit: string | null,
    prix_vente: number,
    slug_produit: null | string,
    size_produit: null | string | number,
    color_produit: null | string,
    weight_produit: null | string,
    client_id: number,
    created_at: string,
    updated_at: string,
    categorie_id: null | number
}

export type Categorie = {
    id: number,
    libelle: string,
    parent_id: null | number,
    description: null | string,
    client_id: number,
    created_at: string,
    updated_at: string
}

export type MagasinItemProduitOccurence = FactureItemProduit & {
    categorie: Categorie | null
}

export type MagasinItemProduit = {
    id: number,
    magasin_id: number,
    produit_id: number,
    observation: null | string,
    prix_vente: string,
    prix_vente_minimum: string,
    stock_alerte: number,
    quantite: number,
    created_at: string,
    updated_at: string,

    produit: MagasinItemProduitOccurence
}

export type FactureItemMagasin = {
    id: number,
    libelle: string,
    localisation: string | null,
    created_at: string,
    updated_at: string,
    client_id: number

    produits?: MagasinItemProduit[]
}

export type FactureItemStock = {
    id: number,
    quantite: number,
    stock_alerte: number,
    prix_vente: string,
    prix_vente_minimum: string,
    observation: null | string,
    produit_id: number,
    magasin_id: number,
    created_at: string,
    updated_at: string

    produit?: FactureItemProduit
}

export type FactureItem = {
    id: number,
    produitId: number | null,
    description: string,
    quantity: number,
    price: number,
    montant: number,
    facture_tresorerie_id: number,
    clientId: number,
    type: string,
    service_id: number | null,
    created_at: string,
    updated_at: string,
    type_remise: null | string,
    remise: string | number,
    magasin_id: number | null,
    stock_id: number | null,
    valeur_remise: string,
    produit: FactureItemProduit | null,
    service: FactureItemService | null,
    magasin: FactureItemMagasin | null,
    stock: FactureItemStock | null
}

export type FactureMouvement = {
    id: number,
    intitule: string,
    montant: number,
    tva: number,
    date_facturation: string,
    date_reglement: string,
    type_mouvement: string,
    status: "Payé" | "En attente" | "En cours",
    charge_id: number | null,
    service_id: number | null,
    compte_tresorerie_id: number,
    client_id: number,
    customer_id: number,
    facture_id: number,
    type_produit: string,
    proof_of_payment: null | string,
    created_at: string,
    updated_at: string,
    partial_amount: null | number,
    taux_paiement: null,
    compte_prinicipal_entreprise_id: null,
    fournisseur_id: null,
    magasin_id: null,
    stock_id: null,
    quantite: null
}

export type FactureCustomer = {
    id: number,
    nom_client: string,
    prenom_client: string | null,
    tel_client: string | null,
    email_client: string | null,
    adresse_client: string | null,
    client_id: number,
    created_at: string,
    updated_at: string,
    secteur_id: number,
    pay_id: string | null
}

export type Facture = {
    id: number,
    numero_facture: string,
    date_facture: string,
    date_echeance: string,
    montant: number,
    tva: number,
    montantHt: number,
    client_id: number,
    customerId: number,
    info_additionnels: null | string,
    status: "Payé" | "Non payé" | "En cours",
    mode_paiement: string,
    editeur: null,
    created_at: string,
    updated_at: string,
    total_remise: string | number,
    etat: string,
    customer: FactureCustomer | null,
    mouvement: FactureMouvement | null,
    items: FactureItem[] | null
}


export type MouvementTransaction =  FactureMouvement & {
    service?: null | FactureItemService,
    customer?: null |  FactureCustomer,
}

export type EncaissementHistoryItem = {
    id: number,
    libelle: string,
    date: string,
    montant: string,
    nouveau_solde_compte: string,
    solde_global_caisse: string,
    reste_a_payer: string | number | null,
    solde_global_banque: string | number | null,
    mouvement_id: number,
    compte_id: number | null,
    type_compte: string | null,
    created_at: string,
    updated_at: string,
    paiement_id: string | null,
}