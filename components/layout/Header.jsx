"use client";
import { useFavorites } from "@/context/FavoritesProvider";
import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.css";
import logo from "@/assets/icon.png";
import NavLink from "./NavLink";

export default function Header() {
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
        </ul>
      </nav>
    </header>
  );
}
