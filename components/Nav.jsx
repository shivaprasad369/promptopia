"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../public/assets/images/logo.svg";
import { signOut, signIn, getProviders, useSession } from "next-auth/react";
export default function Nav() {
  // const isUserLoggedIn=true;
  const [provider, setProvider] = useState(null);
  const { data: session } = useSession();
  const [toggleClicked, setToggleClicked] = useState(true);
  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
     
      setProvider(response);
  
    };
    setUpProvider();
  });
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="promptopia"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/*for DESKTOP navigation */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <div>
            <h2><b>{session.user.name}</b></h2>    
            </div>
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href={"/profile"}>
             <Image
                src={session.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="IMAGE"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
               <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sing in
                </button>
              ))}
          </>
        )}
      </div>
      {/* for mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
           <h4>{session.user.name}</h4> <Image
              src={session.user.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleClicked((prev) => !prev)}
            />
            {toggleClicked && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleClicked(false)}
                >
                  My profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleClicked(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleClicked(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sing in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
