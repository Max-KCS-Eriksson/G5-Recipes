import { useEffect, useMemo, useState } from "react";
import { getCommentsByRecipeId } from "../api/connection.js";
import { formatTimestamp } from "../utils/datetime.js";

export default function DisplayComments({ recipeId }) {
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
  }, [recipeId]);

  const sortedCommentTimeDesc = useMemo(() => {
    return [...comments].sort((a, b) => {
      const aCommentTime = new Date(a.createdAt ?? a.updatedAt ?? 0).getTime();
      const bCommentTime = new Date(b.createdAt ?? b.updatedAt ?? 0).getTime();
      return bCommentTime - aCommentTime;
    });
  }, [comments]);

  switch (status) {
    case "idle":
    case "loading":
      return (
        <section>
          <h2>Kommentarer</h2>
          <div>Hämtar kommentarer…</div>
        </section>
      );

    case "error":
      return (
        <section>
          <h2>Kommentarer</h2>
          <div>Kunde inte hämta kommentarer: {error}</div>
        </section>
      );

    case "success":
      if (sortedCommentTimeDesc.length === 0) {
        return (
          <section>
            <h2>Kommentarer</h2>
            <div>Inga kommentarer ännu.</div>
          </section>
        );
      }
      break;
  }

  return (
    <section>
      <h2>Kommentarer</h2>
      <ul>
        {sortedCommentTimeDesc.map((c) => {
          const submitIsoTime = c.createdAt ?? c.updatedAt;
          const renderedDisplayTime = submitIsoTime
            ? formatTimestamp(submitIsoTime)
            : "";
          return (
            <li key={c.id}>
              <div>
                <strong>{c.author}</strong>{" "}
                {submitIsoTime && renderedDisplayTime ? (
                  <time dateTime={submitIsoTime} title={submitIsoTime}>
                    {renderedDisplayTime}
                  </time>
                ) : null}
              </div>
              <p>{c.comment}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
