import Header from "@/components/layout/Header";
import "./globals.css";
import FavoritesProvider from "@/context/FavoritesProvider";

export const metadata = {
  title: "listed movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <div className="content">
          <FavoritesProvider>
            <Header />
            {children}
          </FavoritesProvider>
        </div>
      </body>
    </html>
  );
}
