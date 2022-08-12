import axios from "axios";
import Head from "next/head";
import React, { useEffect } from "react";
import { useUser } from "../context/user";
import styles from "../styles/Profile.module.css";
import ModalVideo from "react-modal-video";
import { useRouter } from "next/router";

function Home(/*{ user, error }*/) {
  const [videoModal, setVideoModal] = React.useState(null);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  console.log("user: ", user);

  const offers = user?.offers || [];

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
          <p className={styles.code}>
            {user.name}#{user.tag}
          </p>
        )}

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
              <div className={styles.card_image}>
                <picture>
                  <img
                    src={offer.displayIcon}
                    alt={offer.displayName}
                    style={{ maxWidth: "100%" }}
                  />
                </picture>
              </div>
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

// export async function getServerSideProps(context) {
//   try {
//     const { data: user } = await axios.post("http://localhost:3000/api/login", {
//       username: "-------",
//       password: "-------",
//     });

//     console.log("Dataaaaa: ", user);

//     return {
//       props: {
//         user,
//       },
//     };
//   } catch (error) {
//     console.log("getServerSideProps-error: ", error.message);
//     return {
//       props: {
//         error: error.message,
//       },
//     };
//   }
// }

export default Home;
