// ClientNavbar.tsx
"use client";
import MainNav from "@/components/main-nav";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";
import NavbarActions from "@/components/navbar-actions";
import { UserButton } from "@clerk/nextjs";

export const ClientNavbar = ({ data}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsDisabled(false), 300); // Ajusta este valor según la duración de la animación
  };

  // Cierra el menú cuando la pantalla es grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Limpia el controlador de eventos cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative border-b bg-[#252440] dark:bg-[#0D1A26] text-[#FFD700]">
      <div className="flex h-16 items-center px-4 flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col items-start sm:items-center sm:space-y-2  sm:flex-row sm:mt-[-8px]">
          <Container>
            <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
              <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                <Image
                  className="pt-1 pr-4"
                  src="/SuitsToGo-Logo.png"
                  alt="Logo"
                  width={80}
                  height={60}
                  style={{ height: '60px', width: 'auto' }}
                  />
              </Link>
          <NavbarActions />
            </div>
          </Container>
          <MainNav
            isOpen={isOpen}
            data={data}
            className={`${
              isOpen ? "block sm:hidden" : "hidden sm:flex"
            } flex-col sm:flex-row sm:w-auto sm:mx-6 mb-2 sm:mb-0 `}
          />
        </div>
         {/*} <ThemeToggle/>*/}
         <UserButton afterSignOutUrl="/" />
      </div>
      <button
        className="sm:hidden block"
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
    </div>
  );
};
