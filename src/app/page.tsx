import styles from "./page.module.css";
import MainContainer from "@/components/MainContainer";
import Providers from "@/providers";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>PayBill</h1>
      <Providers>
        <MainContainer />
      </Providers>
    </main>
  );
}
