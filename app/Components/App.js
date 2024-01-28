// Inside src/components/Nav.js
"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import image from "./Images/Profile.png"

function App() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src={image}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">
                  <div className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </div>
                </Link>
                <Link href="/about">
                  <div className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    About Us
                  </div>
                </Link>
                <Link href="/products">
                  <div className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Products
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  onBlur={()=>setOpen(false)}
                  className="flex text-gray-800 dark:text-white focus:outline-none"
                >
                  <Image
                    src={image}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </button>
                {open && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <Link href="/profile">
                      <div className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        Profile
                      </div>
                    </Link>
                    <Link href="/logout">
                      <div className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        Logout
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${open ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/">
            <div className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </div>
          </Link>
          <Link href="/about">
            <div className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              About Us
            </div>
          </Link>
          <Link href="/products">
            <div className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Products
            </div>
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <Image
                src={image}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-gray-800 dark:text-white">
                Abhinav Yadav
              </div>
              <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                abhinav@yadav.com
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Link href="/profile">
              <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                Profile
              </div>
            </Link>
            <Link href="/logout">
              <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default App;
