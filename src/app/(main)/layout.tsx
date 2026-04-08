import Header from "@/widgets/header/header";
import Footer from "@/widgets/footer/footer";
import BottomNav from "@/widgets/bottom-nav/bottom-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <div className="hidden md:block">
        <Footer />
      </div>

      <BottomNav />
    </div>
  );
}
