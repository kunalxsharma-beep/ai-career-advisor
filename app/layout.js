import "./globals.css";

export const metadata = {
    title: "AI Career Advisor - Find Your AI Power Tools",
    description: "Get personalized AI tool recommendations based on your role, industry, and experience.",
};

export default function RootLayout({ children }) {
    return (
          <html lang="en">
            <body>{children}</body>
      </html>
    );
}
