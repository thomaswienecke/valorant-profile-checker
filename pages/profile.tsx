import Head from "next/head";
import React, { useEffect } from "react";
import { useUser } from "../context/user";
import styles from "../styles/Profile.module.css";
import ModalVideo from "react-modal-video";
import { useRouter } from "next/router";
import { formatRelative, addSeconds } from "date-fns";

function Home() {
  const [videoModal, setVideoModal] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const router = useRouter();
  const loggedInUser = useUser()?.user;
  const serializedUserParam = router.query.serializedUserParam as string;

  useEffect(() => {
    if (serializedUserParam) {
      let buff =
        serializedUserParam && new Buffer(serializedUserParam, "base64");
      let deserializedUserParam;
      let decodedserializedUserParam = buff.toString("ascii");
      deserializedUserParam = JSON.parse(decodedserializedUserParam);
      setUser(deserializedUserParam);
      return;
    }

    if (loggedInUser) {
      setUser(loggedInUser);
      return;
    }
  }, [loggedInUser, serializedUserParam]);

  let buff = new Buffer(JSON.stringify(user));
  let serializedUser = buff.toString("base64");

  const offers = user?.offers || [];
  const offersUntil = user?.offersUntil || [];
  const bundle = user?.bundle || [];
  const bundleUntil = user?.bundleUntil || [];

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
                  `${window.location.origin}/profile?serializedUserParam=${serializedUser}`
                );
                // window.open(
                //   `/profile?serializedUserParam=${serializedUser}`,
                //   "_blank"
                // );
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

export default Home;
