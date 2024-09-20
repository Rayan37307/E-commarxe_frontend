import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../lib/CartContext";
import { useRouter } from "next/router";
import { SignedIn, SignedOut, UserButton, } from "@clerk/nextjs";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const { cartProducts } = useContext(CartContext)
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    // Update the currentPath state on client side
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const active = 'p-2 text-primary bg-secondary rounded-lg'
  const inActive = 'p-2'

  return <>
    <header className="bg-white sticky top-0 z-40 w-full px-2 md:px-4">
      <div
        className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 border-b border-primary border-opacity-40"
      >
        <Link className="flex gap-1 items-center text-text font-medium text-lg hover:text-primary " href="/">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
          </svg>
          <span> / DreamersClick</span>

        </Link>

        <div className="flex flex-1 items-center justify-end ">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-md">
              <li>
                <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/' ? 'text-primary' : ""} `} href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className={`text-accent transition hover:text-accent/75 ${pathname === ('/products') ? 'text-primary' : ""} `} href="/products">
                  All Products
                </Link>
              </li>

              <li>
                <select className={`text-accent transition hover:text-accent/75 ${pathname === ('/categories') ? 'text-primary' : ""} `} href="/categories">
                  <option value="0">Categories</option>
                  <option value="1">Shoes</option>
                </select>

              </li>


            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <SignedIn>
            <div className="sm:flex sm:gap-2 border-r border-primary pr-4">
                <div class="h-9 w-9">
                  <UserButton />
                </div>
              </div>
            </SignedIn>
            <SignedOut>
            <div className=" sm:gap-2 border-r border-primary pr-4">
                <Link
                  className=" text-md font-medium text-text hidden md:flex"
                  href="/"
                >
                  Login/Sign-up
                </Link>
              </div>
            </SignedOut>

            <div className="ml-4 flow-root lg:ml-4">
              <Link href="/cart" className="group -m-2 flex items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>

                <span className="ml-2 text-md text-primary font-bold group-hover:text-text">{cartProducts.length}</span>
                <span className="sr-only">items in cart, view bag</span>
              </Link>
            </div>

            {/* Mobile navigation button */}
            <div className="block mr-0">
              <button
                onClick={toggleMobileNav}
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                {isMobileNavOpen ? (
                  // X icon for close
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Menu icon for open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {isMobileNavOpen && (
              <div className=" absolute top-24 right-0 bg-white border border-zinc-200 rounded shadow-lg p-6 text-lg ">
                <nav aria-label="Global">
                  <ul className="flex flex-col items-start gap-6 text-md">
                    <li>
                      <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/' ? active : inActive} `} href="/"
                        onClick={toggleMobileNav}
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/products' ? active : inActive}`} href="/products"
                        onClick={toggleMobileNav}
                      >
                        All Products
                      </Link>
                    </li>

                    <li>
                      <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/categories' ? active : inActive}`} href="/categories"
                        onClick={toggleMobileNav}
                      >
                        Categories
                      </Link>
                    </li>


                  </ul>
                </nav>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  </>
}
