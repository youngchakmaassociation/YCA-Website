// import { Public_Sans } from "next/font/google";
import "./globals.css";

// const publicSans = Public_Sans({
//   variable: "--font-public-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "700", "900"],
// });

const publicSans = { variable: "font-sans" }; // Fallback to system font

export const metadata = {
  title: "Young Chakma Association",
  description: "Unity, Empowerment, Progress.",
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${publicSans.variable} font-display antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow max-w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
