import { routes } from "@/config/routes-idkel";
import { DUMMY_ID } from "@/config/constants";
import {
  PiShoppingCartDuotone,
  PiMoneyWavyDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
} from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Général",
  },
  // label end
  {
    name: "Tableau de bord",
    href: "/",
    icon: <PiShapesDuotone />,
    badge: "",
  },
  {
    name: "Ma Tréso",
    href: "#",
    icon: <PiMoneyWavyDuotone />,
    dropdownItems: [
      {
        name: "Tableau de bord",
        href: routes.tresorerie.dashboard,
        badge: "",
      },
      {
        name: "Comptes",
        href: routes.tresorerie.comptes,
        badge: "",
      },
      {
        name: "Devis & factures",
        href: routes.tresorerie.devis.index,
        badge: "",
      },
      {
        name: "Encaissement",
        href: routes.tresorerie.encaissements.index,
        badge: "",
      },
      {
        name: "Décaissement",
        href: routes.tresorerie.decaissements.index,
        badge: "",
      },
    ]
  },
  // {
  //   name: "E-Commerce",
  //   href: "#",
  //   icon: <PiShoppingCartDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Products",
  //       href: routes.eCommerce.products,
  //       badge: "",
  //     }
  //   ]
  // }
];
