import React, { useEffect, useRef, useState } from "react";

interface ScratchRevealImageProps {
  src: string;
  alt: string;
  placeholderLabel: string;
  placeholderSubLabel?: string;
  priority?: boolean;
  variant?: "character" | "group";
}

/**
 * 初回表示時のみ「その場で手描きされながら現れる」スクラッチ／ドローイング風リビールを行うコンポーネント。
 * - IntersectionObserver により Viewport に入った初回のみ `is-revealed` クラスを付与（1度だけ再生）
 * - 画像ファイルが未配置の場合でも、レイアウト崩れや壊れた画像アイコンを出さず、
 *   手描きスケッチ風の透過プレースホルダーとして美しく表示します。
 */
export const ScratchRevealImage: React.FC<ScratchRevealImageProps> = ({
  src,
  alt,
  placeholderLabel,
  placeholderSubLabel = "背景透過WebP素材 配置枠",
  priority = false,
  variant = "character",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [imageMissing, setImageMissing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // すでに再生済みの場合は何もしない（1度だけ再生を保証）
    if (isRevealed) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsRevealed(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.15,
        }
      );

      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  return (
    <div
      ref={containerRef}
      style={
        { "--scratch-delay": priority ? "800ms" : "0ms" } as React.CSSProperties
      }
      className={`scratch-reveal-target relative select-none w-full aspect-[4/3] ${
        isRevealed ? "is-revealed" : ""
      }`}
    >
      {/* 実際の透過WebP画像またはプレースホルダー（マスクによる描き起こし対象） */}
      <div className="scratch-reveal-media w-full h-full">
        {!imageMissing ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            onError={() => setImageMissing(true)}
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(44,40,37,0.12)]"
          />
        ) : (
          /* 画像未配置時の手描きスケッチ風プレースホルダー（背景透過WebPのシルエット感を維持） */
          <div
            role="img"
            aria-label={alt}
            className="w-full h-full flex flex-col items-center justify-center relative p-3"
          >
            {/* 背面の淡い水彩・紙片シルエット（透過WebPが置かれた際のサイズ感を示す） */}
            <svg
              viewBox="0 0 240 240"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              {variant === "group" ? (
                /* モンスターたち（3〜4体グループ）の手描きシルエット枠 */
                <g>
                  <ellipse
                    cx="120"
                    cy="206"
                    rx="96"
                    ry="12"
                    fill="rgba(44, 40, 37, 0.08)"
                  />
                  {/* 左のモンスター枠 */}
                  <path
                    d="M36,192 C28,150 42,114 68,114 C92,114 102,150 96,192 Z"
                    fill="rgba(253, 251, 247, 0.78)"
                    stroke="#7b7167"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                  />
                  {/* 中央のモンスター枠 */}
                  <path
                    d="M84,196 C76,136 94,88 124,88 C154,88 170,136 162,196 Z"
                    fill="rgba(253, 251, 247, 0.88)"
                    stroke="#5c534a"
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                  />
                  {/* 右のモンスター枠 */}
                  <path
                    d="M146,192 C142,148 156,118 180,118 C204,118 214,148 206,192 Z"
                    fill="rgba(253, 251, 247, 0.78)"
                    stroke="#7b7167"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                  />
                </g>
              ) : (
                /* 単体キャラクター（ダツイチくん / エリナーAI）の手描きシルエット枠 */
                <g>
                  <ellipse
                    cx="120"
                    cy="212"
                    rx="64"
                    ry="11"
                    fill="rgba(44, 40, 37, 0.09)"
                  />
                  <path
                    d="M66,200 C54,142 68,54 120,46 C172,54 186,142 174,200 C156,208 84,208 66,200 Z"
                    fill="rgba(253, 251, 247, 0.84)"
                    stroke="#5c534a"
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="120"
                    cy="92"
                    r="30"
                    fill="none"
                    stroke="#8c8177"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </g>
              )}
            </svg>

            {/* プレースホルダーラベル（視認性が高く、かつ世界観を壊さない手描きタグ調） */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 pointer-events-none">
              <span className="font-jp-display text-sm sm:text-base font-bold text-[#3d3732] bg-[#fdfbf7]/90 px-3 py-1 rounded-lg border border-[#5c534a]/20 shadow-xs">
                {placeholderLabel}
              </span>
              <span className="mt-1.5 text-[11px] text-[#6e655d] bg-[#fdfbf7]/85 px-2 py-0.5 rounded">
                {placeholderSubLabel}
              </span>
              <span className="mt-1 text-[10px] text-[#8a8077] break-all max-w-[90%]">
                {src}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 初回リビール時に走る手描き鉛筆スクラッチ線エフェクト（案3の末広がり3.5往復をベースに左へ32度傾けた斜めストローク・太さ1.5pxの単一パス） */}
      <svg
        viewBox="0 0 200 200"
        className="scratch-stroke-overlay absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <path
          d="M116,25 L52,44 L152,64 L38,94 L166,118 L24,150 L176,174 L74,188"
          transform="rotate(-32 100 100)"
          pathLength="1"
          fill="none"
          stroke="#5c534a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 1"
        />
      </svg>
    </div>
  );
};
