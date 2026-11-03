import React, { useState } from "react";
import { siteConfig } from "../data/siteData";

/**
 * ページ全体の最背面・固定背景コンポーネント
 * - スマートフォン版（9:16）とPC版（16:9）を画面サイズ・向きに応じて `<picture>` で切り替え
 * - iOS Safari を含めモバイルでも安定する `position: fixed (top-0 left-0 w-full h-lvh z-0)` の独立レイヤー方式
 * - 画像ファイルが未配置の場合でも、ダツイチー新大陸の手描き水彩・絵本のような固定背景レイヤーとして機能し、
 *   その上に重なる白系UIとの2層構造（奥行き）を美しく保ちます。
 */
export const FixedBackground: React.FC = () => {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-lvh z-0 pointer-events-none overflow-hidden select-none"
    >
      {!imageMissing ? (
        <picture className="block w-full h-full">
          {/* PC・横長画面向け 16:9 背景画像 */}
          <source
            media="(min-width: 768px), (orientation: landscape)"
            srcSet={siteConfig.background.desktop}
          />
          {/* スマートフォン・縦長画面向け 9:16 背景画像 */}
          <img
            src={siteConfig.background.mobile}
            alt=""
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            draggable={false}
            onError={() => setImageMissing(true)}
            className="w-full h-full object-cover object-center"
          />
        </picture>
      ) : (
        /* 背景画像未配置時のフォールバック：新大陸の穏やかな空と大地を感じさせる手描き水彩トーンの固定背景 */
        <div className="w-full h-full relative bg-gradient-to-b from-[#dcebe6] via-[#e9efe2] to-[#e6dec8]">
          {/* 柔らかな太陽光と新大陸の稜線を感じさせる軽量SVG背景 */}
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full opacity-75"
          >
            <defs>
              <radialGradient id="skyGlow" cx="50%" cy="22%" r="60%">
                <stop offset="0%" stopColor="#fffdf7" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#e5f0ea" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#d7e6df" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="distantHills" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c7dccb" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#dfd8c2" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="foregroundMeadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4dec4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e5dcc5" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* 空のやわらかな光 */}
            <rect width="1440" height="900" fill="url(#skyGlow)" />

            {/* 遠くの雲（手描き風のやさしい曲線） */}
            <path
              d="M120,210 Q180,175 250,195 Q320,160 400,190 Q460,180 490,215 Z"
              fill="#ffffff"
              fillOpacity="0.55"
            />
            <path
              d="M980,165 Q1040,130 1120,155 Q1190,135 1260,165 Q1310,160 1340,185 Z"
              fill="#ffffff"
              fillOpacity="0.5"
            />

            {/* 新大陸の遠景の丘陵 */}
            <path
              d="M0,610 Q280,535 620,585 T1240,560 T1440,590 L1440,900 L0,900 Z"
              fill="url(#distantHills)"
            />

            {/* 手前の穏やかな大地 */}
            <path
              d="M0,700 Q380,645 760,685 T1440,665 L1440,900 L0,900 Z"
              fill="url(#foregroundMeadow)"
            />
          </svg>
        </div>
      )}

      {/* 文字や白系UIの視認性を高め、全体のトーンを落ち着かせる極薄のベール */}
      <div className="absolute inset-0 bg-[#fdfbf7]/20" />
    </div>
  );
};
