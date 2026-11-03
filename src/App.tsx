/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, stickerSeries, characterList } from "./data/siteData";
import { FixedBackground } from "./components/FixedBackground";
import { ScratchRevealImage } from "./components/ScratchRevealImage";
import { StickerCard } from "./components/StickerCard";
import { CharacterBlock } from "./components/CharacterBlock";

/** セクション見出し直下の緩やかな湾曲アンダーバー */
const SectionUnderline: React.FC = () => (
  <svg
    viewBox="0 0 84 10"
    className="w-16 sm:w-20 h-2.5 mx-auto mt-3 text-[#b5bdb9]"
    aria-hidden="true"
  >
    <path
      d="M3,7 Q42,2 81,7"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

export default function App() {
  const [logoMissing, setLogoMissing] = useState(false);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    const setInitialFvHeight = () => {
      document.documentElement.style.setProperty(
        "--fv-height",
        `${window.innerHeight}px`
      );
    };
    setInitialFvHeight();

    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        setInitialFvHeight();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentYear = new Date().getFullYear();
  const yearDisplay = currentYear > 2026 ? `2026 - ${currentYear}` : "2026";
  const copyrightText = `© ${yearDisplay} Datsuichi All Rights Reserved.`;

  const isSafeMainUrl =
    typeof siteConfig.mainWebsite.url === "string" &&
    (siteConfig.mainWebsite.url.startsWith("https://") ||
      siteConfig.mainWebsite.url.startsWith("http://"));

  return (
    <div className="relative min-h-dvh text-[#2c2825] selection:bg-[#06c755]/20">
      {/* 最背面：スクロールしても画面奥に残り続ける固定背景レイヤー（スマホ 9:16 / PC 16:9 自動切替） */}
      <FixedBackground />

      {/* 上層コンテンツ：スマートフォンファーストの1カラム設計 */}
      <main className="relative z-10 w-full">
        {/* ====================================================================
         * 1. First View
         * 上部：英字タイトル＋メインタイトル
         * 中央：ダツイチくん＋エリナーAI（1枚もの透過WebP・手描きスクラッチリビール）
         * 下部：コピー（カードは透明、背景画像に文字が浮かび上がる表現）
         * 最下部：小さなScroll Downガイド（購入CTAは置かない）
         * ==================================================================== */}
        <section
          aria-labelledby="fv-heading"
          className="w-full max-w-[540px] mx-auto px-5 sm:px-6 min-h-[var(--fv-height,100svh)] pt-6 pb-2 sm:py-12 lg:py-6 flex flex-col justify-between lg:justify-center items-center text-center"
        >
          {/* 上部：英字タイトル＋メインタイトル */}
          <header className="pt-1 sm:pt-3 lg:pt-0">
            <p className="font-en-eyebrow text-sm sm:text-base font-medium text-[#5c534a]">
              {siteConfig.hero.eyebrow}
            </p>
            <h1
              id="fv-heading"
              className="mt-1.5 sm:mt-2 font-jp-display text-[29px] sm:text-4xl lg:text-[40px] font-bold text-[#2c2825] leading-snug tracking-wide"
            >
              <span className="block">{siteConfig.hero.titleLine1}</span>
              <span className="block mt-0.5">
                {siteConfig.hero.titleLine2.includes("LINE") ? (
                  <>
                    {siteConfig.hero.titleLine2.split("LINE")[0]}
                    <span className="text-[#06C755]">LINE</span>
                    {siteConfig.hero.titleLine2.split("LINE")[1]}
                  </>
                ) : (
                  siteConfig.hero.titleLine2
                )}
              </span>
            </h1>
          </header>

          {/* 中央：ダツイチくん＋エリナーAI（1枚もの透過WebP・4:3・左右余白最小限で最大化） */}
          <div className="my-2 sm:my-6 lg:my-3 w-[calc(100%+1.5rem)] -mx-3 sm:w-full sm:mx-0 lg:max-w-[440px] flex items-center justify-center">
            <ScratchRevealImage
              src={siteConfig.hero.mainImage.src}
              alt={siteConfig.hero.mainImage.alt}
              placeholderLabel={siteConfig.hero.mainImage.placeholderLabel}
              placeholderSubLabel="First View 1枚もの透過WebP (4:3)"
              priority={true}
              variant="group"
            />
          </div>

          {/* 下部：コピー ＆ 最下部：小さなScroll Downガイド */}
          <div className="w-full flex flex-col items-center">
            <p className="font-jp-display text-base sm:text-lg font-bold text-[#2c2825] leading-relaxed bg-transparent px-4 py-1.5 sm:px-5 sm:py-2.5 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
              <span className="block">{siteConfig.hero.copyLine1}</span>
              <span className="block mt-0.5">
                {siteConfig.hero.copyLine2.includes("ワクワク") ? (
                  <>
                    {siteConfig.hero.copyLine2.split("ワクワク")[0]}
                    <span className="animate-waku-first">ワク</span>
                    <span className="animate-waku-second">ワク</span>
                    {siteConfig.hero.copyLine2.split("ワクワク")[1]}
                  </>
                ) : (
                  siteConfig.hero.copyLine2
                )}
              </span>
            </p>

            <a
              href="#line-stickers"
              aria-label="下のLINEスタンプ一覧へスクロール"
              className="mt-3 sm:mt-6 inline-flex lg:hidden flex-col items-center gap-1 min-h-[44px] min-w-[44px] px-3 pt-1 text-[#9e9891] hover:text-[#7a736c] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e9891] rounded-lg animate-scroll-down-appear"
            >
              <span className="font-en-eyebrow text-xs tracking-[0.2em]">
                Scroll Down
              </span>
              <svg
                viewBox="0 0 24 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-8 animate-gentle-float"
                aria-hidden="true"
              >
                <path d="M12 4v40" />
              </svg>
            </a>
          </div>
        </section>

        {/* ====================================================================
         * 2. LINE Stickers
         * 見出し：LINE STICKERS / LINEスタンプ
         * スマホ1列 / タブレット2列 / PC3列のレスポンシブGrid配置（siteData.tsの配列から自動生成）
         * ==================================================================== */}
        <section
          id="line-stickers"
          aria-labelledby="stickers-heading"
          className="w-full max-w-[540px] md:max-w-[768px] lg:max-w-[1200px] mx-auto px-5 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24"
        >
          <div className="text-center mb-8 sm:mb-10">
            <p className="font-en-eyebrow text-xs sm:text-sm font-semibold text-[#5c534a] uppercase">
              LINE STICKERS
            </p>
            <h2
              id="stickers-heading"
              className="mt-1.5 font-jp-display text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#2c2825]"
            >
              LINEスタンプ
            </h2>
            <SectionUnderline />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {stickerSeries.map((series) => (
              <StickerCard key={series.id} item={series} />
            ))}
          </div>
        </section>

        {/* ====================================================================
         * 3. World / 世界観紹介
         * 見出し：THE WORLD / ダツイチー新大陸の世界
         * 固定背景の空気感にふわっと溶け込む白系ベールをかけ、内部カードは無色透過・落ち着いた左揃え
         * ==================================================================== */}
        <section
          id="the-world"
          aria-labelledby="world-heading"
          className="w-full ui-soft-veil-section py-20 sm:py-28"
        >
          <div className="w-full max-w-[540px] lg:max-w-[680px] mx-auto px-5 sm:px-6">
            <div className="text-center mb-7 sm:mb-9">
              <p className="font-en-eyebrow text-xs sm:text-sm font-semibold text-[#5c534a] uppercase">
                {siteConfig.world.eyebrow}
              </p>
              <h2
                id="world-heading"
                className="mt-1.5 font-jp-display text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#2c2825]"
              >
                {siteConfig.world.title}
              </h2>
              <SectionUnderline />

              {/* 双葉アイコン（ページで用いている緑色） */}
              <svg
                viewBox="0 0 28 28"
                className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mt-7 text-[#06c755]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 24V12" />
                <path d="M14 16C9 16 5 13 5 8.5C9.5 8.5 14 11 14 16Z" />
                <path d="M14 13.5C14 9 18.5 6.5 23 6.5C23 11 19 13.5 14 13.5Z" />
              </svg>
            </div>

            <div className="px-2 py-2 sm:px-4 sm:py-4 lg:px-0 lg:w-fit lg:mx-auto text-left">
              <div className="space-y-4 text-sm sm:text-[15px] lg:text-base text-[#3d3732] leading-[1.9]">
                {siteConfig.world.paragraphs.map((text, index) => (
                  <p key={index}>
                    {text.includes("うまくいく日も、ちょっと迷う日も。") ? (
                      <>
                        うまくいく日も、ちょっと迷う日も。
                        <br className="hidden lg:inline" />
                        {text.split("うまくいく日も、ちょっと迷う日も。")[1]}
                      </>
                    ) : (
                      text
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
         * 4. Characters
         * 見出し：CHARACTERS / キャラクター紹介
         * 1. ダツイチくん / 2. エリナーAI（アイ） / 3. モンスターズ
         * ==================================================================== */}
        <section
          id="characters"
          aria-labelledby="characters-heading"
          className="w-full max-w-[540px] lg:max-w-[960px] mx-auto px-5 sm:px-6 py-16 sm:py-24"
        >
          <div className="text-center mb-10 sm:mb-12">
            <p className="font-en-eyebrow text-xs sm:text-sm font-semibold text-[#5c534a] uppercase">
              CHARACTERS
            </p>
            <h2
              id="characters-heading"
              className="mt-1.5 font-jp-display text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#2c2825]"
            >
              キャラクター紹介
            </h2>
            <SectionUnderline />
          </div>

          <div className="flex flex-col gap-14 sm:gap-16">
            {characterList.map((character) => (
              <CharacterBlock key={character.id} character={character} />
            ))}
          </div>
        </section>

        {/* ====================================================================
         * 5. Main Website CTA ＆ 6. Footer
         * 固定背景の空気感にふわっと溶け込む白系ベールを画面横幅いっぱいに敷き、その上にロゴ・CTAボタン・フッターを配置
         * 内部のカード（CTAボタンを除く）はすべて無色透過
         * ==================================================================== */}
        <div className="w-full ui-soft-veil-bottom">
          <section
            aria-label="ダツイチー新大陸 公式Webサイトへのご案内"
            className="w-full max-w-[540px] mx-auto px-5 sm:px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 flex flex-col items-center text-center"
          >
            {/* ダツイチー新大陸 ロゴマーク（手描きスケッチ画像・直下のCTAボタンと同じ横幅・乗算ブレンド＋控えめな薄グレートーン） */}
            <div className="w-full max-w-[320px] flex items-center justify-center">
              {!logoMissing ? (
                <img
                  src={siteConfig.mainWebsite.logoImage}
                  alt={siteConfig.mainWebsite.logoAlt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={() => setLogoMissing(true)}
                  className="w-full h-auto object-contain mix-blend-multiply opacity-50 select-none"
                />
              ) : (
                /* 手描きスケッチロゴ画像 未配置時のプレースホルダー */
                <div
                  role="img"
                  aria-label={siteConfig.mainWebsite.logoAlt}
                  className="w-full py-6 px-4 rounded-2xl border border-dashed border-[#5c534a]/25 flex flex-col items-center justify-center text-center select-none"
                >
                  <span className="font-jp-display text-sm font-bold text-[#5c534a]/80">
                    {siteConfig.mainWebsite.logoAlt}
                  </span>
                  <span className="mt-1 text-[11px] text-[#6e655d]">
                    手描きスケッチロゴ 配置枠 (WebP)
                  </span>
                  <span className="mt-1 text-[10px] text-[#8a8077] break-all">
                    {siteConfig.mainWebsite.logoImage}
                  </span>
                </div>
              )}
            </div>

            {/* 十分な余白 */}
            <div className="h-14 sm:h-16" aria-hidden="true" />

            {/* CTAボタン */}
            <div className="w-full max-w-[320px]">
              <a
                href={isSafeMainUrl ? siteConfig.mainWebsite.url : "#"}
                target={isSafeMainUrl ? "_blank" : undefined}
                rel={isSafeMainUrl ? "noopener noreferrer" : undefined}
                className="w-full min-h-[50px] px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00d2e8] via-[#00a8f3] to-[#2974e6] hover:brightness-105 active:scale-[0.99] text-white font-jp-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8f3] whitespace-nowrap"
              >
                <span>{siteConfig.mainWebsite.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 6. Footer（内部カードは無色透過） */}
          <footer className="w-full max-w-[540px] mx-auto px-5 sm:px-6 pb-8 sm:pb-12">
            <div className="px-6 py-6 sm:px-8 sm:py-7 text-center">
              <p className="text-xs sm:text-sm text-[#4f4842] font-medium tracking-wide">
                {siteConfig.footer.organization}
              </p>
              <p className="mt-1.5 font-en-eyebrow text-xs text-[#7a7067] tracking-wider">
                {copyrightText}
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
