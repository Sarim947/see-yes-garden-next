"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "seeyes-spoga-gafa-2026-hidden";
const EXHIBITION_END = "2026-06-25T00:00:00+02:00";
const INVITATION_HREF =
  "/contact?product=spoga%2Bgafa%202026%20Invitation&category=Trade%20Show&message=Please%20send%20me%20an%20invitation%20for%20spoga%2Bgafa%202026.%20Hall%204.1%20Booth%20F010.#inquiry";

export default function TradeShowFloatingCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isExpired = Date.now() >= new Date(EXHIBITION_END).getTime();
    const isHidden = window.localStorage.getItem(STORAGE_KEY) === "true";

    setIsVisible(!isExpired && !isHidden);
  }, []);

  if (!isVisible) return null;

  const hidePermanently = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  return (
    <aside className="trade-show-card" aria-label="spoga+gafa 2026 invitation">
      <div className="trade-show-card-image">
        <Image
          src="/images/trade-show/spoga-gafa-2026.png"
          alt="Meet us at spoga+gafa 2026, Hall 4.1 Booth F010"
          fill
          sizes="(max-width: 760px) 92vw, 420px"
          priority
        />
      </div>
      <div className="trade-show-card-actions">
        <button type="button" onClick={hidePermanently}>
          Do not show again
        </button>
        <a href={INVITATION_HREF}>Send me invitation</a>
      </div>

      <style jsx>{`
        .trade-show-card {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 80;
          width: min(420px, calc(100vw - 32px));
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 10px;
          background: #061f34;
          box-shadow: 0 24px 70px rgba(4, 20, 34, 0.32);
        }

        .trade-show-card-image {
          position: relative;
          aspect-ratio: 1 / 1;
          background: #061f34;
        }

        .trade-show-card-image :global(img) {
          object-fit: cover;
        }

        .trade-show-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 12px;
          background: #071f33;
        }

        .trade-show-card-actions button,
        .trade-show-card-actions a {
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 900;
          line-height: 1.2;
          text-align: center;
        }

        .trade-show-card-actions button {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: transparent;
          color: #fff;
          cursor: pointer;
        }

        .trade-show-card-actions a {
          background: #ff7a1a;
          color: #fff;
        }

        @media (max-width: 760px) {
          .trade-show-card {
            right: 14px;
            bottom: 14px;
            width: calc(100vw - 28px);
            max-height: calc(100vh - 28px);
          }

          .trade-show-card-image {
            aspect-ratio: 1 / 1;
            max-height: calc(100vh - 104px);
          }
        }
      `}</style>
    </aside>
  );
}
