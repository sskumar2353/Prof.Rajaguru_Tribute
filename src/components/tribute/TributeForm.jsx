import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { createTribute } from "../../services/tributeService";
import styles from "./TributeForm.module.css";

export default function TributeForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    place: "",
    message: "",
    website: "",
  });

  const [state, setState] = useState({
    loading: false,
    error: "",
    success: false,
  });

  function update(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submit(event) {
    event.preventDefault();

    if (form.website) return;

    if (
      form.name.trim().length < 2 ||
      form.place.trim().length < 2 ||
      form.message.trim().length < 3
    ) {
      setState({
        loading: false,
        error: "Please enter your name, place, and a meaningful message.",
        success: false,
      });
      return;
    }

    setState({
      loading: true,
      error: "",
      success: false,
    });

    try {
      const tribute = await createTribute({
        name: form.name,
        place: form.place,
        message: form.message,
      });

      onCreated(tribute);

      setForm({
        name: "",
        place: "",
        message: "",
        website: "",
      });

      setState({
        loading: false,
        error: "",
        success: true,
      });
    } catch (error) {
      console.error(error);

      setState({
        loading: false,
        error: "We could not save your tribute. Please try again.",
        success: false,
      });
    }
  }

  return (
    <form id="post" className={styles.form} onSubmit={submit}>
      <div className={styles.header}>
        <div>
          <span>Leave a Memory</span>
          <h3>Share your tribute</h3>
        </div>

        <Send className={styles.headerIcon} />
      </div>

      <div className={styles.fields}>
        <label>
          Name

          <input
            name="name"
            value={form.name}
            onChange={update}
            maxLength={100}
            placeholder="Your name"
            required
          />
        </label>

        <div className={styles.field}>
          <label htmlFor="place">Place</label>

          <input
            id="place"
            name="place"
            type="text"
            value={form.place}
            onChange={update}
            maxLength={120}
            placeholder="Your place"
            required
          />
        </div>

        <label>
          Tribute message

          <textarea
            name="message"
            value={form.message}
            onChange={update}
            maxLength={1000}
            rows={6}
            placeholder="Write a memory, a prayer, or a few words from the heart..."
            required
          />
        </label>

        <label className={styles.honeypot} aria-hidden="true">
          Website

          <input
            name="website"
            value={form.website}
            onChange={update}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {state.error && (
        <p className={styles.error}>
          {state.error}
        </p>
      )}

      {state.success && (
        <p className={styles.success}>
          <CheckCircle2 size={17} />
          Your tribute has been added.
        </p>
      )}

      <button type="submit" disabled={state.loading}>
        {state.loading ? "Publishing…" : "Publish Tribute"}
        <Send size={16} />
      </button>

      <p className={styles.note}>
        By posting, you agree that your message may be displayed publicly on
        this memorial.
      </p>
    </form>
  );
}