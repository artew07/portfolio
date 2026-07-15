"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, ExternalLink, X } from "lucide-react";
import { GradientShimmer } from "gradient-shimmer";
import { useInteractionSound } from "./sound-provider";
import styles from "./contact-button.module.css";

type ModalState = "closed" | "opening" | "open" | "closing";
type CopyState = "idle" | "copied" | "error";

const EMAIL = "asuslov4242@gmail.com";

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Unable to copy email address");
  }
}

function getCloseDuration() {
  return (
    Number.parseFloat(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--modal-close-dur"),
    ) || 150
  );
}

function shouldManageDialogFocus() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function ContactButton({ className }: { className: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalState, setModalState] = useState<ModalState>("closed");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const { playTap } = useInteractionSound();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const isModalVisible = modalState !== "closed";

  const finishClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setModalState("closed");
    if (shouldManageDialogFocus()) {
      triggerRef.current?.focus();
    }
  }, []);

  const openModal = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setModalState("opening");
    playTap();
  };

  const closeModal = useCallback(() => {
    if (modalState === "closed" || modalState === "closing") {
      return;
    }

    setModalState("closing");
    closeTimerRef.current = window.setTimeout(() => {
      finishClose();
    }, getCloseDuration() + 50);
  }, [finishClose, modalState]);

  const copyEmail = async () => {
    try {
      await copyToClipboard(EMAIL);
      setCopyState("copied");
      playTap();
    } catch {
      setCopyState("error");
    }

    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }

    copyTimerRef.current = window.setTimeout(() => {
      setCopyState("idle");
      copyTimerRef.current = null;
    }, 1800);
  };

  useEffect(() => {
    if (modalState !== "opening") {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setModalState("open");
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [modalState]);

  useEffect(() => {
    if (modalState === "open" && shouldManageDialogFocus()) {
      closeButtonRef.current?.focus();
    }
  }, [modalState]);

  useEffect(() => {
    if (!isModalVisible) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, isModalVisible]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    },
    [],
  );

  return (
    <>
      <button
        aria-expanded={isModalVisible}
        aria-haspopup="dialog"
        className={className}
        onClick={openModal}
        onPointerEnter={(event) => {
          const supportsHover = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          ).matches;

          if (event.pointerType === "mouse" && supportsHover) {
            setIsHovered(true);
          }
        }}
        onPointerLeave={() => setIsHovered(false)}
        ref={triggerRef}
        type="button"
      >
        {isHovered ? (
          <GradientShimmer
            angle={105}
            duration={0.5}
            easing="smooth"
            gradient="mint"
            pauseBetween={1600}
            spread={4}
          >
            Contact me
          </GradientShimmer>
        ) : (
          <span>Contact me</span>
        )}
      </button>

      {isModalVisible
        ? createPortal(
            <div
              className={`${styles.backdrop} ${
                modalState === "open" ? styles.backdropOpen : ""
              } ${modalState === "closing" ? styles.backdropClosing : ""}`}
              onClick={() => {
                closeModal();
                playTap();
              }}
            >
              <section
                aria-labelledby="contact-modal-title"
                aria-modal="true"
                className={`${styles.modal} t-modal ${
                  modalState === "open"
                    ? "is-open"
                    : modalState === "closing"
                      ? "is-closing"
                      : ""
                }`}
                onClick={(event) => event.stopPropagation()}
                onTransitionEnd={(event) => {
                  if (
                    modalState === "closing" &&
                    event.currentTarget === event.target &&
                    event.propertyName === "opacity"
                  ) {
                    finishClose();
                  }
                }}
                role="dialog"
              >
                <header className={styles.modalHeader}>
                  <p id="contact-modal-title">Contact me</p>
                  <button
                    aria-label="Close contact dialog"
                    className={styles.closeButton}
                    onClick={() => {
                      closeModal();
                      playTap();
                    }}
                    ref={closeButtonRef}
                    type="button"
                  >
                    <X aria-hidden="true" size={16} strokeWidth={1.7} />
                  </button>
                </header>
                <div className={styles.contactOptions}>
                  <button
                    aria-label={`Copy ${EMAIL}`}
                    className={styles.contactOption}
                    onClick={copyEmail}
                    type="button"
                  >
                    <span className={styles.contactOptionContent}>
                      <span className={styles.serviceIcon}>
                        <img alt="" src="/icons/contact-email.svg" />
                      </span>
                      <span className={styles.contactOptionText}>
                        <span className={styles.contactOptionLabel}>Email</span>
                        <span className={styles.contactOptionValue}>{EMAIL}</span>
                      </span>
                    </span>
                    <span className={styles.contactOptionAction}>
                      <span
                        aria-hidden="true"
                        className="t-icon-swap"
                        data-state={copyState === "copied" ? "b" : "a"}
                      >
                        <span className="t-icon" data-icon="a">
                          <Copy size={15} strokeWidth={2} />
                        </span>
                        <span className="t-icon" data-icon="b">
                          <Check size={16} strokeWidth={2} />
                        </span>
                      </span>
                    </span>
                  </button>
                  <a
                    className={styles.contactOption}
                    href="https://telegram.me/art_ew"
                    onClick={playTap}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className={styles.contactOptionContent}>
                      <span className={styles.serviceIcon}>
                        <img alt="" src="/icons/contact-telegram.svg" />
                      </span>
                      <span className={styles.contactOptionText}>
                        <span className={styles.contactOptionLabel}>Telegram</span>
                        <span className={styles.contactOptionValue}>
                          @art_ew
                        </span>
                      </span>
                    </span>
                    <ExternalLink aria-hidden="true" size={16} strokeWidth={1.8} />
                  </a>
                  <a
                    className={styles.contactOption}
                    href="https://x.com/artyoyom"
                    onClick={playTap}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className={styles.contactOptionContent}>
                      <span className={styles.serviceIcon}>
                        <img alt="" src="/icons/contact-x.svg" />
                      </span>
                      <span className={styles.contactOptionText}>
                        <span className={styles.contactOptionLabel}>X</span>
                        <span className={styles.contactOptionValue}>@artyoyom</span>
                      </span>
                    </span>
                    <ExternalLink aria-hidden="true" size={16} strokeWidth={1.8} />
                  </a>
                  <a
                    className={styles.contactOption}
                    href="https://www.linkedin.com/in/artem-suslov-7447b3224/"
                    onClick={playTap}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className={styles.contactOptionContent}>
                      <span className={styles.serviceIcon}>
                        <img alt="" src="/icons/contact-linkedin.svg" />
                      </span>
                      <span className={styles.contactOptionText}>
                        <span className={styles.contactOptionLabel}>LinkedIn</span>
                        <span className={styles.contactOptionValue}>Artem Suslov</span>
                      </span>
                    </span>
                    <ExternalLink aria-hidden="true" size={16} strokeWidth={1.8} />
                  </a>
                </div>
              </section>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
