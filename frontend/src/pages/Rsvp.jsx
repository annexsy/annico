import { useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import './Rsvp.css';

const initialForm = {
  name: '',
  attending: 'yes',
  dietary: '',
};

export default function Rsvp() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const name = form.name.trim();
    if (!name) {
      setError('Please enter your name.');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('RSVP is not configured yet. Please try again later.');
      return;
    }

    setStatus('submitting');

    const { error: insertError } = await supabase.from('rsvps').insert({
      name,
      attending: form.attending === 'yes',
      dietary: form.dietary.trim() || null,
    });

    if (insertError) {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    setForm(initialForm);
  }

  if (status === 'success') {
    return (
      <section className="rsvp-page">
        <div className="rsvp-page__inner">
          <h1 className="rsvp-page__title">Thank you</h1>
          <p className="rsvp-page__lead">
            Your RSVP has been received. We look forward to celebrating with you.
          </p>
          <button
            type="button"
            className="rsvp-page__button"
            onClick={() => setStatus('idle')}
          >
            Submit another response
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp-page">
      <div className="rsvp-page__inner">
        <h1 className="rsvp-page__title">RSVP</h1>
        <p className="rsvp-page__lead">
          Please let us know if you will be joining us. Share any dietary needs
          so we can take care of you.
        </p>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <label className="rsvp-form__field">
            <span className="rsvp-form__label">Name</span>
            <input
              className="rsvp-form__input"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <fieldset className="rsvp-form__field rsvp-form__fieldset">
            <legend className="rsvp-form__label">Will you attend?</legend>
            <label className="rsvp-form__choice">
              <input
                type="radio"
                name="attending"
                value="yes"
                checked={form.attending === 'yes'}
                onChange={handleChange}
              />
              <span>Joyfully accept</span>
            </label>
            <label className="rsvp-form__choice">
              <input
                type="radio"
                name="attending"
                value="no"
                checked={form.attending === 'no'}
                onChange={handleChange}
              />
              <span>Regretfully decline</span>
            </label>
          </fieldset>

          <label className="rsvp-form__field">
            <span className="rsvp-form__label">
              Dietary needs or allergies
              <span className="rsvp-form__optional">Optional</span>
            </span>
            <textarea
              className="rsvp-form__textarea"
              name="dietary"
              rows={4}
              value={form.dietary}
              onChange={handleChange}
              placeholder="e.g. vegetarian, gluten-free, nut allergy"
            />
          </label>

          {error ? <p className="rsvp-form__error">{error}</p> : null}

          <button
            type="submit"
            className="rsvp-page__button"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
          </button>
        </form>
      </div>
    </section>
  );
}
