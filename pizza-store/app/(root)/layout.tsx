import { Header } from "@/shared/components/shared";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Pizza store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return ( 
        <main className="min-h-screen">
          <Header/>
          {children}
          {modal}
        </main>
  );
}
