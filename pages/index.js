import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getWriteups } from "../lib/astra";

export default function Home({ writeups }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Writeup Link</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          writeup.link
        </h1>
        <p className={styles.description}>
          Information security writeup directory.
        </p>
        <div className={styles.grid}>
          {writeups.map((writeup) => {
            return (
              <div key={writeup.writeup_id} className={styles.card}>
                <h3>{writeup.title}</h3>
                <Image
                  src="https://serene-rosalind-05dde0.netlify.app/images/"+{writeup.company_id}+".png"
                  alt="Picture of the company"
                  width={500}
                  height={500}
                  />
                  <p>
                  <b>Author:</b> {writeup.author}
                  <br />
                  <b>Date:</b> {writeup.date}
                  <br />
                  <b>Company:</b> {writeup.company_id}
                  <br />
                  <b>Link:</b> {writeup.real_link}
                  <br />
                  <b>Short link:</b> {writeup.short_link}
                  <br />
                  <b>Archive link:</b> {writeup.archive_link}
                </p>
              </div>
            );
          })}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const writeups = (await getWriteups()) || [];
  return {
    props: { writeups, preview },
  };
}
