import { Metadata } from "next";
import logoImg from "@public/logo-idkel.png";
import logoIconImg from "@public/logo-short.svg";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { LAYOUT_OPTIONS } from "./enums";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "idkel - Votre partenaire de gestion par excellence",
  description: `L'application de gestion qui vous facilite la vie`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - idkel app` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - idkel app` : title,
      description,
      url: "https://idkel.io",
      siteName: "idkel App", // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png",
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  };
};
