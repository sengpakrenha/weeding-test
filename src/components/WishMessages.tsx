"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { WishRecord } from "@/lib/messages";
import { WISH_MAX_MESSAGE, WISH_MAX_NAME } from "@/lib/messages";
import { FadeIn } from "./FadeIn";

function formatWishDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function WishMessages() {
  const { wishes } = siteConfig;
  const [list, setList] = useState<WishRecord[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(true);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, message: false });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameTrimmed = name.trim();
  const messageTrimmed = message.trim();

  const nameError = useMemo(() => {
    if (!nameTrimmed) return "Please enter your name";
    if (nameTrimmed.length > WISH_MAX_NAME)
      return `Name must be at most ${WISH_MAX_NAME} characters`;
    return null;
  }, [nameTrimmed]);

  const messageError = useMemo(() => {
    if (!messageTrimmed) return "Please write your wish";
    return null;
  }, [messageTrimmed]);

  const isValid = !nameError && !messageError;

  const refresh = useCallback(async () => {
    setLoadError(null);
    setLoadingList(true);
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Could not load wishes");
      const data = (await res.json()) as WishRecord[];
      setList(Array.isArray(data) ? data : []);
    } catch {
      setLoadError("We couldn’t load wishes. Please refresh the page.");
      setList([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (!wishes.enabled) return;
    void refresh();
  }, [wishes.enabled, refresh]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, message: true });
    setSubmitError(null);
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameTrimmed,
          message: messageTrimmed,
        }),
      });
      const data = (await res.json()) as WishRecord & { error?: string };
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setList((prev) => [data, ...prev.filter((m) => m.id !== data.id)]);
      setName("");
      setMessage("");
      setTouched({ name: false, message: false });
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!wishes.enabled) return null;

  return (
    <section id="wishes" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn className="text-center">
          <p className="font-script text-3xl text-gold md:text-4xl">From the heart</p>
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">
            {wishes.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            {wishes.subtitle}
          </p>
        </FadeIn>

        <FadeIn className="mt-12" delay={0.06}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 border border-gold/25 bg-white/70 p-8 shadow-sm backdrop-blur-sm md:p-10"
            noValidate
          >
            <div>
              <label htmlFor="wish-name" className="block text-xs uppercase tracking-widest text-muted">
                Your name <span className="text-gold-dark">*</span>
              </label>
              <input
                id="wish-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                maxLength={WISH_MAX_NAME}
                autoComplete="name"
                aria-invalid={touched.name && !!nameError}
                aria-describedby={touched.name && nameError ? "wish-name-error" : undefined}
                className={`mt-2 w-full border-b bg-transparent px-0 py-2 font-serif text-ink outline-none transition focus:border-gold ${
                  touched.name && nameError ? "border-red-400/70" : "border-sand"
                }`}
                placeholder="e.g. Alex Morgan"
              />
              {touched.name && nameError ? (
                <p id="wish-name-error" className="mt-2 text-sm text-red-700/90" role="alert">
                  {nameError}
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="wish-message" className="block text-xs uppercase tracking-widest text-muted">
                  Your wish <span className="text-gold-dark">*</span>
                </label>
                <span
                  className={`text-xs tabular-nums ${
                    message.length > WISH_MAX_MESSAGE * 0.9 ? "text-gold-dark" : "text-muted"
                  } ${message.length >= WISH_MAX_MESSAGE ? "font-medium text-red-800/80" : ""}`}
                  aria-live="polite"
                >
                  {message.length} / {WISH_MAX_MESSAGE}
                </span>
              </div>
              <textarea
                id="wish-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, WISH_MAX_MESSAGE))}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                rows={4}
                maxLength={WISH_MAX_MESSAGE}
                aria-invalid={touched.message && !!messageError}
                aria-describedby={touched.message && messageError ? "wish-message-error" : undefined}
                className={`mt-2 w-full resize-y border px-3 py-3 font-serif text-ink outline-none transition focus:border-gold ${
                  touched.message && messageError
                    ? "border-red-400/70 bg-red-50/30"
                    : "border-sand bg-white/50"
                }`}
                placeholder="A few kind words for the happy couple…"
              />
              {touched.message && messageError ? (
                <p id="wish-message-error" className="mt-2 text-sm text-red-700/90" role="alert">
                  {messageError}
                </p>
              ) : null}
            </div>

            {submitError ? (
              <p className="text-center text-sm text-red-800/90" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full border border-gold bg-gold/10 py-3 font-serif text-sm uppercase tracking-[0.2em] text-ink transition enabled:hover:bg-gold/25 disabled:cursor-not-allowed disabled:border-sand disabled:bg-sand/40 disabled:text-muted disabled:opacity-80"
            >
              {isSubmitting ? "Sending…" : "Share your wish"}
            </button>
          </form>
        </FadeIn>

        <div className="mt-16">
          <FadeIn>
            <h3 className="text-center font-serif text-xl font-light text-ink md:text-2xl">
              Wishes for {siteConfig.couple.partner1} & {siteConfig.couple.partner2}
            </h3>
          </FadeIn>

          {loadError ? (
            <p className="mt-8 text-center text-sm text-red-800/90">{loadError}</p>
          ) : null}

          {loadingList && !loadError ? (
            <p className="mt-10 text-center text-sm text-muted">Loading wishes…</p>
          ) : null}

          {!loadingList && !loadError && list.length === 0 ? (
            <FadeIn className="mt-10">
              <p className="text-center font-serif text-muted italic">
                No wishes yet — yours can be the first.
              </p>
            </FadeIn>
          ) : null}

          {list.length > 0 ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
              {list.map((item, index) => (
                <FadeIn key={item.id} delay={Math.min(index * 0.04, 0.2)}>
                  <li>
                    <article className="group h-full border border-gold/20 bg-white/80 p-6 shadow-sm transition hover:border-gold/35 hover:shadow-md md:p-8">
                      <div className="flex items-start justify-between gap-3 border-b border-gold/15 pb-4">
                        <p className="font-script text-2xl text-gold-dark md:text-3xl">{item.name}</p>
                        <span
                          className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.2em] text-muted"
                          title={item.createdAt}
                        >
                          {formatWishDate(item.createdAt)}
                        </span>
                      </div>
                      <p className="mt-5 whitespace-pre-wrap font-serif text-base leading-relaxed text-ink/90">
                        {item.message}
                      </p>
                    </article>
                  </li>
                </FadeIn>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
