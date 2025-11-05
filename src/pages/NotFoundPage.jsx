import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <section className={styles.notFound} aria-label="Sidan saknas">
      <div className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <p>Sidan hittades inte.</p>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
