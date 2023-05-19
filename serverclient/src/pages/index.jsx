import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Nunamarket {"-----> "}
            <code className={styles.code}>using sql, neo4j & mongoDB</code>
          </p>
          <div>
            <a href="sql.js" target="_blank" rel="noopener noreferrer"></a>
          </div>
        </div>

        <div className={styles.center}>
          <Image src="/pic.png" width={500} height={300} priority />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              SQL <span>-&gt;</span>
            </h2>
            <p>Disover data from SQL</p>
          </a>
          <h1 className="title">
 <Link href="./neo4j">NEO4j</Link>
          </h1>
          <h1 className="title">
 <Link href="./sql">SQL</Link>
          </h1>
          <h1 className="title">
 <Link href="./mongodb">MongoDB</Link>
          </h1>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Neo4j <span>-&gt;</span>
            </h2>
            <p>Discover data from Neo4j</p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              MongoDB <span>-&gt;</span>
            </h2>
            <p>Discober data from MongoDB</p>
          </a>
        </div>
      </main>
    </>
  );
}
