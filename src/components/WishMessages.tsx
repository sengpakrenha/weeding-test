"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { EASE } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import type { WishRecord } from "@/lib/messages";
import { WISH_MAX_MESSAGE, WISH_MAX_NAME } from "@/lib/messages";
import { FadeIn } from "./FadeIn";

const STORAGE_KEY = "wishes";

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

function WishCard({ item }: { item: WishRecord }) {
  return (
    <article className="h-full rounded-2xl border border-gold/12 bg-white/95 p-7 shadow-card transition duration-500 hover:border-gold/25 hover:shadow-luxe md:p-9">
      <div className="flex items-start justify-between gap-3 border-b border-gold/10 pb-4">
        <p className="font-script text-[clamp(1.375rem,2.8vw,1.75rem)] leading-tight text-gold-dark">
          {item.name}
        </p>
        <span
          className="shrink-0 pt-0.5 text-[10px] uppercase tracking-[0.24em] text-muted"
          title={item.createdAt}
        >
          {formatWishDate(item.createdAt)}
        </span>
      </div>
      <p className="mt-5 whitespace-pre-wrap font-body text-[0.9375rem] leading-[1.82] text-ink/90 md:text-base md:leading-[1.85]">
        {item.message}
      </p>
    </article>
  );
}

export function WishMessages() {
  const { wishes } = siteConfig;

  const reduceMotion = useReducedMotion();

  const [list, setList] = useState<WishRecord[]>([]);
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

  useEffect(() => {
    if (!wishes.enabled) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WishRecord[];
        setList(Array.isArray(parsed) ? parsed : []);
      } else {
        setList([]);
      }
    } catch {
      setList([]);
    } finally {
      setLoadingList(false);
    }
  }, [wishes.enabled]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, message: true });
    setSubmitError(null);
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const newWish: WishRecord = {
        id: Date.now().toString(),
        name: nameTrimmed,
        message: messageTrimmed,
        createdAt: new Date().toISOString(),
      };

      const updatedList = [newWish, ...list];
      setList(updatedList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      setName("");
      setMessage("");
      setTouched({ name: false, message: false });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!wishes.enabled) return null;

  return (
    <section id="wishes" className="border-t border-gold/10 bg-ivory section-y">
      <div className="content-narrow">
        <FadeIn className="text-center">
          <p className="font-script text-3xl text-gold md:text-4xl lg:text-[2.75rem]">
            From the heart
          </p>
          <h2 className="font-heading mt-5 text-3xl font-medium text-ink md:text-4xl lg:text-[2.75rem]">
            {wishes.title}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            {wishes.subtitle}
          </p>
        </FadeIn>

        <FadeIn className="mt-14 md:mt-16" delay={0.06}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl border border-gold/15 bg-white/85 p-10 shadow-md backdrop-blur-sm md:p-12"
            noValidate
          >
            <div className="space-y-2">
              <label
                htmlFor="wish-name"
                className="block font-body text-sm font-medium text-ink"
              >
                Your Name
              </label>
              <input
                id="wish-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                maxLength={WISH_MAX_NAME}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gold/20 bg-white/80 px-4 py-3 font-body text-ink placeholder:text-muted/60 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10"
              />
              {touched.name && nameError && (
                <p className="text-sm text-red-700">{nameError}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="wish-message"
                className="block font-body text-sm font-medium text-ink"
              >
                Your Wish
              </label>
              <textarea
                id="wish-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                maxLength={WISH_MAX_MESSAGE}
                rows={4}
                placeholder="Write your heartfelt wish..."
                className="w-full resize-none rounded-xl border border-gold/20 bg-white/80 px-4 py-3 font-body text-ink placeholder:text-muted/60 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10"
              />
              <div className="flex items-center justify-between">
                {touched.message && messageError ? (
                  <p className="text-sm text-red-700">{messageError}</p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-muted">
                  {messageTrimmed.length}/{WISH_MAX_MESSAGE}
                </span>
              </div>
            </div>

            {submitError && (
              <p className="text-center text-sm text-red-700">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gold px-8 py-4 font-heading text-sm font-medium tracking-wide text-white shadow-md transition hover:bg-gold-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Wish"}
            </button>
          </form>
        </FadeIn>

        <div className="mt-16 md:mt-20">
          <FadeIn>
            <h3 className="text-center font-heading text-lg font-medium tracking-tight text-ink md:text-xl">
              Wishes for {siteConfig.couple.partner1} & {siteConfig.couple.partner2}
            </h3>
          </FadeIn>

          {loadingList && (
            <p className="mt-12 text-center text-sm text-muted">Loading wishes…</p>
          )}

          {!loadingList && list.length === 0 && (
            <FadeIn className="mt-12">
              <p className="text-center font-body text-muted italic">
                No wishes yet — yours can be the first.
              </p>
            </FadeIn>
          )}

          {list.length > 0 && (
            <ul className="mt-10 grid gap-7 md:grid-cols-2 md:gap-8">
              {reduceMotion ? (
                list.map((item) => (
                  <li key={item.id}>
                    <WishCard item={item} />
                  </li>
                ))
              ) : (
                <AnimatePresence initial={false}>
                  {list.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <WishCard item={item} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
