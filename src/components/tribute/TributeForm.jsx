import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { createTribute } from '../../services/tributeService';
import styles from './TributeForm.module.css';

export default function TributeForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', place: '', message: '', website: '' });
  const [state, setState] = useState({ loading: false, error: '', success: false });

  function update(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (form.website) return; // Honeypot catch
    if (form.name.trim().length < 2 || form.message.trim().length < 3) {
      setState({
        loading: false,
        error: 'Please enter your name and a heartfelt message.',
        success: false,
      });
      return;
    }

    setState({ loading: true, error: '', success: false });
    try {
      const tribute = await createTribute({
        name: form.name.trim(),
        place: form.place.trim(),
        message: form.message.trim(),
      });
      onCreated(tribute);
      setForm({ name: '', place: '', message: '', website: '' });
      setState({ loading: false, error: '', success: true });
    } catch (err) {
      console.error(err);
      setState({
        loading: false,
        error: 'We could not save your tribute right now. Please try again.',
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
        <Send className={styles.headerIcon} size={22} />
      </div>

      <div className={styles.fields}>
        <label>
          Your Name
          <input
            name="name"
            value={form.name}
            onChange={update}
            maxLength={100}
            placeholder="e.g. Bro. David or Dr. Grace"
            required
          />
        </label>

        <label>
          City or Country <em>(optional)</em>
          <input
            name="place"
            value={form.place}
            onChange={update}
            maxLength={100}
            placeholder="e.g. Chennai, Madurai, or Hyderabad"
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

        <label>
          Tribute Message
          <textarea
            name="message"
            value={form.message}
            onChange={update}
            maxLength={1000}
            rows={5}
            placeholder="Share a memory, message of gratitude, or a prayer..."
            required
          />
        </label>
      </div>

      {state.error && <p className={styles.error}>{state.error}</p>}
      {state.success && (
        <p className={styles.success}>
          <CheckCircle2 size={17} /> Your tribute has been added to the memorial.
        </p>
      )}

      <button type="submit" className={styles.button} disabled={state.loading}>
        {state.loading ? 'Publishing…' : 'Publish Tribute'} <Send size={15} />
      </button>

      <p className={styles.note}>
        By submitting, you agree that your memory will be displayed publicly on this memorial wall for family and friends.
      </p>
    </form>
  );
}
