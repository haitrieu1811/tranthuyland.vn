import ContactButton from "@/components/contact-button";
import Logo from "@/components/layouts/logo";
import MobileMenu from "@/components/layouts/mobile-menu";
import HeaderNavigation from "@/components/layouts/navigation";
import apiRequests from "@/lib/apiRequests";

export default async function Header() {
  const navigation = await apiRequests.navigation();

  if (!navigation) return null;

  return (
    <div className="sticky inset-x-0 top-0 z-50 bg-background">
      <header className="border-b hidden lg:block">
        <div className="container bg-background flex justify-between items-center space-x-10 py-4">
          <Logo />
          <HeaderNavigation links={navigation.links} />
          <ContactButton />
        </div>
      </header>
      <MobileMenu />
    </div>
  );
}
