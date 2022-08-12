import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import { useUser } from "../context/user";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    const { data } = await axios.post(
      "/api/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!data?.error) {
      setUser(data);
      Router.push("/profile");
    } else {
      setError(data.error);
    }
    setLoading(false);
  };

  if (error) {
    return <>Error</>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Valorant Checker</title>
        <meta
          name="description"
          content="A valorant checker that fetches your store, profile and further information"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Valorant Checker</h1>

        <p className={styles.description}>Enter your riot credentials</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Submit
          </button>
          {loading && <p>Loading...</p>}
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright &copy; {new Date().getFullYear()} Valorant Checker
        </a>
      </footer>
    </div>
  );
}
