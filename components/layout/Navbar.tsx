"use client";

import { SignInDialog } from "@/features/auth/components/sign-in/sign-in-dialog";
import { useAuth } from "@/features/auth/contexts/auth.context";
import { useSignInDialog } from "@/features/auth/hooks/use-sign-in-dialog";
import { ProfileDropdown } from "@/features/profile/components/profile-dropdown";
import { useNavigation } from "@/providers/NavigationProvider";
import { useLenis } from "lenis/react";
import { useMediaQuery } from "usehooks-ts";

import { useState } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { CloseIcon, HamburgerMenuIcon, Logo } from "../icon";
import { Button } from "../ui/button";
import LocaleSelect from "../ui/locale-select";
import BlogNavbar from "./BlogNavbar";
import Navigation from "./Navigation";

export { NavbarPortal } from "./navbar-portal";

const SCROLL_TOP_THRESHOLD = 64;

const Navbar = () => {
  const t = useTranslations("nav");
  const { user: currentUser } = useAuth();

  const desktop = useMediaQuery("(min-width: 768px)");

  const [isAtTop, setIsAtTop] = useState(true);

  const { isOpen, toggleMenu } = useNavigation();

  const { isSignInDialogOpen, setIsSignInDialogOpen } = useSignInDialog();

  useLenis(({ scroll }) => {
    if (scroll <= SCROLL_TOP_THRESHOLD) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }
  });

  const pathname = usePathname();

  if (pathname.startsWith("/blog")) {
    return (
      <>
        <BlogNavbar />
        <Navigation />
      </>
    );
  }

  const mustShowNavbarAsLightMode = ["/profile"].some(
    (path) => pathname === path,
  );

  const mustShowMenu = [
    "/",
    "/contact",
    "/adamo-id",
    "/adamo-sign",
    "/adamo-risk",
    "/adamo-pay",
  ].some((path) => pathname === path);

  const mustShowContact = [
    "/",
    "/contact",
    "/adamo-id",
    "/adamo-sign",
    "/adamo-risk",
    "/adamo-pay",
  ].some((path) => pathname === path);

  return (
    <>
      <SignInDialog
        isAtTop={isAtTop}
        open={isSignInDialogOpen}
        onOpenChange={setIsSignInDialogOpen}
      />
      <div
        data-inview="fade-down"
        data-fixed
        data-at-top={isAtTop}
        data-open={isOpen}
        className="flex items-center justify-between px-4 py-6 lg:px-6 fixed top-0 inset-x-0 z-40 group bg-transparent md:bg-white data-[at-top=false]:bg-white data-[at-top=false]:shadow-sm data-[at-top=false]:py-3 data-[open=true]:bg-primary data-[open=true]:shadow-none data-[open=true]:py-6"
        style={{
          transition: "padding 350ms ease-out, background-color 100ms ease-out",
        }}
      >
        <div data-navbar-portal>
          <Link href="/">
            <Logo
              className={cn(
                "text-white md:text-primary group-data-[at-top=false]:text-primary transition-colors group-data-[open=true]:text-white",
                {
                  "text-primary": mustShowNavbarAsLightMode,
                },
              )}
            />
          </Link>
        </div>
        <div className="flex items-center gap-x-6">
          <LocaleSelect
            align={desktop ? "start" : "end"}
            className={cn(
              "text-white active:text-neutral-100 group-data-[at-top=false]:text-neutral-600 group-data-[at-top=false]:hover:text-neutral-700 group-data-[at-top=false]:active:text-neutral-800 md:text-neutral-600 md:hover:text-neutral-700 md:active:text-neutral-800 group-data-[open=true]:!text-white",
              {
                "text-neutral-600 hover:text-neutral-700 active:text-neutral-800":
                  mustShowNavbarAsLightMode,
              },
            )}
          />

          {/* Mobile */}
          <div className="md:hidden flex gap-4 items-center">
            {currentUser ? (
              <ProfileDropdown user={currentUser} />
            ) : (
              <Button
                size="md"
                onClick={() => setIsSignInDialogOpen(true)}
                variant={
                  isOpen ? "secondary" : isAtTop ? "secondary" : "primary"
                }
              >
                {t("login")}
              </Button>
            )}
            {mustShowMenu && (
              <Button
                size="md"
                onClick={toggleMenu}
                variant={
                  isOpen ? "secondary" : isAtTop ? "secondary" : "primary"
                }
              >
                {isOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
              </Button>
            )}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* {mustShowContact && (
              <Button
                asChild
                size="md"
                variant={isOpen ? "secondary" : "primary"}
              >
                <Link href="/contact">{t("contact")}</Link>
              </Button>
            )} */}
            {currentUser ? (
              <ProfileDropdown user={currentUser} />
            ) : (
              <Button
                size="md"
                onClick={() => setIsSignInDialogOpen(true)}
                variant={isOpen ? "secondary" : "primary"}
              >
                {t("sign-in")}
              </Button>
            )}
            <Button
              asChild
              size="md"
              style={{
                color: "var(--neutral-900)",
                backgroundColor: "var(--adamo-pay-300)",
              }}
              variant={isOpen ? "secondary" : "primary"}
            >
              <Link href="/register">{t("createFreeAccount")}</Link>
            </Button>
          </div>

          {/* Desktop */}
          {mustShowMenu && (
            <div className="hidden md:block">
              <Button
                size="md"
                variant={isOpen ? "secondary" : "primary"}
                onClick={toggleMenu}
              >
                {isOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </>
  );
};

export default Navbar;
