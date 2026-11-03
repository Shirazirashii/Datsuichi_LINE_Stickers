import React, { useEffect, useRef, useState } from "react";
import { CharacterItem } from "../data/siteData";
import { ScratchRevealImage } from "./ScratchRevealImage";

interface CharacterBlockProps {
  character: CharacterItem;
}

/**
 * キャラクター紹介枠コンポーネント
 * 構成：
 * キャラクター名
 * ↓
 * キャラクター画像（Viewportに入った初回手描きスクラッチリビール＋タップで次の画像が描き直される）
 * ↓
 * 紹介文の吹き出し（LINEの親しみやすさを手描き世界観に合わせて再解釈した白系吹き出し）
 */
export const CharacterBlock: React.FC<CharacterBlockProps> = ({ character }) => {
  const { images } = character;
  const [currentIndex, setCurrentIndex] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // キャラクター枠が画面付近に入ったタイミングで、2枚目以降のイラストを静かに先読み（タップ切替時の遅延を防止）
  useEffect(() => {
    if (images.length <= 1 || typeof window === "undefined") return;
    const el = articleRef.current;
    if (!el) return;

    let preloaded = false;
    const preloadRemaining = () => {
      if (preloaded) return;
      preloaded = true;
      images.slice(1).forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              preloadRemaining();
              observer.disconnect();
            }
          });
        },
        { rootMargin: "240px 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      preloadRemaining();
    }
  }, [images]);

  const handleImageTap = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const currentSrc = images[currentIndex];
  const imageNumber = currentIndex + 1;
  const totalImages = images.length;

  return (
    <article
      ref={articleRef}
      className="w-full flex flex-col items-center text-center lg:grid lg:grid-cols-2 lg:gap-x-10 lg:items-center"
    >
      {/* 1. キャラクター名（スマホ・タブレットは画像の上に中央揃え、PCは右カラムの吹き出し直上に落ち着いた左揃え） */}
      <h3 className="mb-1.5 sm:mb-2.5 lg:mb-3 lg:col-start-2 lg:row-start-1 lg:justify-self-start lg:pl-2 lg:text-left font-jp-display text-xl sm:text-2xl font-bold text-[#2c2825] tracking-wide">
        {character.name}
      </h3>

      {/* 2. キャラクター画像（タップで次の画像が描き直される・すべて4:3で左右余白最小限・PCでは左カラム全2行に跨り中央配置） */}
      <button
        type="button"
        onClick={handleImageTap}
        aria-label={`${character.name}のイラスト（${imageNumber}/${totalImages}枚目・タップで次のイラストへ切り替え）`}
        className="group w-full mx-auto lg:col-start-1 lg:row-start-1 lg:row-span-2 block bg-transparent border-0 p-0 cursor-pointer [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06c755] rounded-2xl relative"
      >
        <ScratchRevealImage
          key={`${character.id}-${currentIndex}`}
          src={currentSrc}
          alt={`${character.alt}（${imageNumber}/${totalImages}）`}
          placeholderLabel={`${character.name} (${imageNumber}/${totalImages})`}
          placeholderSubLabel={
            character.isGroup
              ? "3〜4体グループ透過WebP 配置枠（タップで切替）"
              : "キャラクター透過WebP 配置枠（タップで切替）"
          }
          variant={character.isGroup ? "group" : "character"}
        />
        {/* マイクロガイド（目立たない控えめなグレー・見た目の位置や余白は1pxも変えずに下方向の透明タップ判定のみ拡張） */}
        <span
          aria-hidden="true"
          className="mt-1.5 -mb-2.5 pb-2.5 pr-1 flex items-center justify-end gap-1 text-[11px] text-[#9e9891] group-hover:text-[#7a736c] group-active:text-[#5c534a] transition-colors duration-150 tracking-wider select-none"
        >
          <span className="inline-block transition-transform duration-150 group-active:scale-95">
            Tap!
          </span>
          <span>
            ({imageNumber}/{totalImages})
          </span>
        </span>
      </button>

      {/* 3. 紹介文の吹き出し（柔らかな角丸＋小さな尻尾・落ち着いた左揃え・PCでは右カラム2行目で高さ自然調整） */}
      <div className="mt-2.5 lg:mt-0 lg:col-start-2 lg:row-start-2 lg:self-start w-full ui-speech-bubble px-5 py-4 sm:px-7 sm:py-5 text-left">
        {/* 吹き出しの小さな尻尾（スマホ・タブレットは上向き、PC 2カラム時は左向き） */}
        <svg
          viewBox="0 0 24 13"
          className="ui-speech-tail"
          aria-hidden="true"
        >
          <path
            d="M2,13 Q9,6 12,1 Q15,6 22,13 Z"
            fill="#ffffff"
          />
          <path
            d="M2,13 Q9,6 12,1 Q15,6 22,13"
            fill="none"
            stroke="rgba(72, 64, 56, 0.16)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-sm sm:text-[15px] lg:text-base text-[#3d3732] leading-relaxed whitespace-pre-line">
          {character.speech}
        </p>
      </div>
    </article>
  );
};
