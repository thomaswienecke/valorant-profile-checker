import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../styles/Profile.module.css";
import ModalVideo from "react-modal-video";
import { useRouter } from "next/router";
import { formatRelative, addSeconds } from "date-fns";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

function Home({ user }) {
  const [videoModal, setVideoModal] = React.useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
  }, [user]);

  const offers = user?.offers || [];
  const offersUntil = user?.offersUntil || 0;
  const bundle = user?.bundle || [];
  const bundleUntil = user?.bundleUntil || 0;

  const sharedUserKey = user?.shareKey;

  return (
    <div className={styles.container}>
      <ModalVideo
        channel="custom"
        autoplay
        isOpen={!!videoModal}
        url={videoModal}
        onClose={() => setVideoModal(null)}
      />
      <Head>
        <title>Valorant Profile</title>
        <meta
          name="description"
          content="A valorant checker that fetches your store, profile and further information"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Valorant Profile</h1>

        {user?.name && (
          <div style={{ display: "flex" }}>
            <p className={styles.code}>
              {user.name}#{user.tag}
            </p>
            <button
              className={styles.sharebutton}
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/profile?sharedUserKey=${sharedUserKey}`
                );
              }}
            >
              Share
            </button>
          </div>
        )}

        <div className={styles.subtitle}>
          Daily Offers until{" "}
          <div className={styles.code} style={{ marginTop: "12px" }}>
            {formatRelative(addSeconds(new Date(), offersUntil), new Date())}
          </div>
        </div>

        <div className={styles.grid}>
          {offers.map((offer) => (
            <a
              className={
                offer.streamedVideo ? styles.cardclickable : styles.card
              }
              key={offer.displayName}
              onClick={(e) => {
                e.preventDefault();
                setVideoModal(offer.streamedVideo);
              }}
            >
              <div className={styles.card_title}>{offer.displayName}</div>
              <div
                className={styles.card_image}
                style={{
                  background: `url('${offer?.displayIcon}') no-repeat`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              />
            </a>
          ))}
        </div>

        <div className={styles.subtitle}>
          Bundle until{" "}
          <div className={styles.code} style={{ marginTop: "12px" }}>
            {formatRelative(addSeconds(new Date(), bundleUntil), new Date())}
          </div>
        </div>

        <div className={styles.grid}>
          {bundle
            .filter((offer) => offer.enrichedItem)
            .map((offer) => (
              <a
                className={
                  offer.enrichedItem?.streamedVideo
                    ? styles.cardclickable
                    : styles.card
                }
                key={offer.enrichedItem?.displayName}
                onClick={(e) => {
                  e.preventDefault();
                  setVideoModal(offer.enrichedItem?.streamedVideo);
                }}
              >
                <div className={styles.card_title}>
                  {offer.enrichedItem?.displayName}
                </div>
                <div
                  className={styles.card_image}
                  style={{
                    background: `url('${offer.enrichedItem?.displayIcon}') no-repeat`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                />
              </a>
            ))}
        </div>
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { sharedUserKey } = ctx.query;

  console.log("BASE_URL: ", publicRuntimeConfig?.BASE_URL);

  const { data } = await axios.get(
    `${publicRuntimeConfig?.BASE_URL}/api/fetchSharedData`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: { sharedUserKey },
    }
  );

  return {
    props: {
      user: data,
    },
  };
};

export default Home;
