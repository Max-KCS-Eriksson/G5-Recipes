import { useEffect, useMemo, useState } from "react";
import { getCommentsByRecipeId } from "../api/connection.js";
import { formateDateFromISO } from "../utils/formatDate.js";
import commenterIcon from "../assets/commenter-symbol.svg";
import styles from "./DisplayComments.module.css";

export default function DisplayComments({ recipeId, refreshFlag = false }) {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const list = await getCommentsByRecipeId(recipeId);
        if (!cancelled) {
          setComments(Array.isArray(list) ? list : []);
          setStatus("success");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
          setStatus("error");
        }
      }
    }

    if (recipeId) load();
    return () => {
      cancelled = true;
    };
  }, [recipeId, refreshFlag]);

  const sortedCommentTimeDesc = useMemo(() => {
    return [...comments].sort((a, b) => {
      const aCommentTime = new Date(a.createdAt ?? a.updatedAt ?? 0).getTime();
      const bCommentTime = new Date(b.createdAt ?? b.updatedAt ?? 0).getTime();
      return bCommentTime - aCommentTime;
    });
  }, [comments]);

  const renderStatusMessage = (message) => (
    <div className={styles.statusMessage}>{message}</div>
  );

  switch (status) {
    case "idle":
    case "loading":
      return (
        <section className={styles.commentsSection}>
          {renderStatusMessage("Hämtar kommentarer…")}
        </section>
      );

    case "error":
      return (
        <section className={styles.commentsSection}>
          {renderStatusMessage(`Kunde inte hämta kommentarer: ${error}`)}
        </section>
      );

    case "success":
      if (sortedCommentTimeDesc.length === 0) {
        return (
          <section className={styles.commentsSection}>
            {renderStatusMessage("Inga kommentarer ännu.")}
          </section>
        );
      }
      break;
  }

  return (
    <section className={styles.commentsSection}>
      <ul className={styles.commentsList}>
        {sortedCommentTimeDesc.map((c) => {
          const submitIsoTime = c.createdAt ?? c.updatedAt;
          const renderedDisplayTime = submitIsoTime
            ? formateDateFromISO(submitIsoTime)
            : "";
          return (
            <li key={c.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.commentLeft}>
                  <img
                    src={commenterIcon}
                    alt="Användarikon"
                    className={styles.commentIcon}
                  />
                  <strong className={styles.commentAuthor}>{c.author}</strong>
                </div>

                {submitIsoTime && renderedDisplayTime && (
                  <time
                    className={styles.commentTime}
                    dateTime={submitIsoTime}
                    title={submitIsoTime}
                  >
                    {renderedDisplayTime}
                  </time>
                )}
              </div>
              <p className={styles.commentText}>"{c.comment}"</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
