import { Poppins } from "next/font/google";
import "./globals.css";

const pop = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Books Dashboard",
  description: "A Dashboard for books and Authors information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pop.className}>{children}</body>
    </html>
  );
}
