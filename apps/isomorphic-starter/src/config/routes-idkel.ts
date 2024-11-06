import { create } from "lodash";

export const routes = {
    index: "/",
    tresorerie: {
        dashboard: "/tresorerie",
        comptes: "/tresorerie/comptes",
        devis: {
            index: "/tresorerie/devis",
            create: "/tresorerie/devis/create",
        },
        encaissements: {
            index: "/tresorerie/encaissements",
        },
        decaissements: {
            index: "/tresorerie/decaissements",
        },
    }
}