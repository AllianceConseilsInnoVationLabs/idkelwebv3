import type { Metadata } from "next";
import { headers } from "next/headers";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "@utils/class-names";
import NextProgress from "@components/next-progress";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import { ThemeProvider, JotaiProvider } from "@/app/shared/theme-provider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";

import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { TitleProvider } from "@/context/pageTitleContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "idkel",
  description: "Votre partenaire de gestion par excellence",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const headerList = headers();
  const isNotHydrogen = headerList.get("x-no-hydrogen") == "true" ;

  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <ThemeProvider>
          <AuthProvider>
            <TitleProvider>
              <NextProgress />
              <JotaiProvider>
                {isNotHydrogen ? children : <HydrogenLayout>{children}</HydrogenLayout>}

                <GlobalDrawer />
                <GlobalModal />
              </JotaiProvider>
            </TitleProvider>
          </AuthProvider>
        </ThemeProvider>
        
        <Toaster />
      </body>
    </html>
  );
}
