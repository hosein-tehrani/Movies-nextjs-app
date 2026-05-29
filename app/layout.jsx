import Header from "@/components/layout/Header";
import "./globals.css";
import FavoritesProvider from "@/context/FavoritesProvider";
import { Toaster } from "react-hot-toast";
import SessionProviderClient from "@/components/layout/SessionProviderClient";
import { getServerSession } from "next-auth/next";
import { handler } from "@/app/api/auth/[...nextauth]/route";
export const metadata = {
  title: "listed movies",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(handler);
  return (
    <html lang="en">
      <body className="body">
        <div className="content">
          <SessionProviderClient session={session}>
          <FavoritesProvider>
            <Header />
            {children}
          </FavoritesProvider>
          </SessionProviderClient>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
