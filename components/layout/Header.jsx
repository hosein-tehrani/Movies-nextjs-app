"use client";
import { useFavorites } from "@/context/FavoritesProvider";
import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.css";
import logo from "@/assets/icon.png";
import NavLink from "./NavLink";
import { Button } from "react-bootstrap";
import { useSession, signOut } from "next-auth/react";
export default function Header() {
const { data: session, status } = useSession();
const { state } = useFavorites();
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} priority alt="a plate with foods" />
        yara movies
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink href="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink href="/favorites">
              Favorites {!!state.counter && <span>{state.counter}</span>}
            </NavLink>
          </li>
          {status === "loading" ? (
            <li><span>Loading...</span></li>
          ) : session?.user ? (
            <li>
              <Button onClick={() => signOut({ callbackUrl: "/login" })}>logout</Button> 
            </li>
          ) : (
            <li>
              <NavLink href="/login">login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
