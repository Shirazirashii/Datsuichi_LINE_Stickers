import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { StickerSeriesItem } from "../data/siteData";

interface StickerCardProps {
  item: StickerSeriesItem;
}

/**
 * LINEスタンプ 各シリーズカード
 * - 白〜オフホワイト系で統一し、固定背景から自然に浮かび上がるギャラリー風カード
 * - status が "available" の場合は「LINE STOREで見る」CTAを表示
 * - status が "coming-soon" の場合はリンクではない「Coming Soon」ステータス表示に自動切り替え
 */
export const StickerCard: React.FC<StickerCardProps> = ({ item }) => {
  const [imageMissing, setImageMissing] = useState(false);
  const [showPlaceholderNotice, setShowPlaceholderNotice] = useState(false);

  const isAvailable = item.status === "available";
  const isSafeExternalUrl =
    typeof item.url === "string" &&
    (item.url.startsWith("https://") || item.url.startsWith("http://"));

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isSafeExternalUrl) {
      e.preventDefault();
      setShowPlaceholderNotice(true);
    }
  };

  const imageContent = !imageMissing ? (
    <img
      src={item.image}
      alt={`${item.volume} ${item.title} メイン画像`}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setImageMissing(true)}
      className="w-full h-full object-contain select-none"
    />
  ) : (
    /* スタンプメイン画像 プレースホルダー（無色透明・枠線なし） */
    <div
      role="img"
      aria-label={`${item.volume} スタンプメイン画像 プレースホルダー`}
      className="w-full h-full flex flex-col items-center justify-center text-center p-4"
    >
      <span className="font-en-eyebrow text-xs font-semibold text-[#655e57] tracking-widest">
        LINE STICKERS {item.volume.toUpperCase()}
      </span>
      <span className="font-jp-display text-sm sm:text-base font-bold text-[#3d3732] mt-1">
        {item.volume} メイン画像 プレースホルダー
      </span>
      <span className="mt-1.5 text-[11px] text-[#8a8077] break-all">
        {item.image}
      </span>
    </div>
  );

  return (
    <article className="ui-sticker-card p-5 sm:p-7 flex flex-col h-full">
      {/* 1. メイン画像（スタンプ画像を主役にしたギャラリー枠・無色透明・販売中は画像タップでもLINE STOREへ遷移） */}
      {isAvailable ? (
        <a
          href={isSafeExternalUrl ? item.url! : "#"}
          onClick={handleCtaClick}
          target={isSafeExternalUrl ? "_blank" : undefined}
          rel={isSafeExternalUrl ? "noopener noreferrer" : undefined}
          aria-label={`${item.volume} ${item.title} をLINE STOREで見る`}
          className="w-full aspect-[4/3] sm:aspect-[16/10] bg-transparent flex items-center justify-center overflow-hidden p-4 relative rounded-xl transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06c755]"
        >
          {imageContent}
        </a>
      ) : (
        <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-transparent flex items-center justify-center overflow-hidden p-4 relative">
          {imageContent}
        </div>
      )}

      {/* 2. Vol番号 ＆ 3. テーマ名 */}
      <div className="mt-5">
        <p className="font-en-eyebrow text-sm sm:text-base font-semibold text-[#655e57]">
          {item.volume}
        </p>
        <h3 className="font-jp-display text-lg sm:text-xl font-bold text-[#2c2825] mt-1 leading-snug">
          {item.title}
        </h3>
      </div>

      {/* 4. 一言説明 */}
      <p className="mt-2.5 text-sm sm:text-[15px] text-[#4f4842] leading-relaxed">
        {item.description}
      </p>

      {/* 5. CTAまたはステータス表示 */}
      <div className="pt-6 mt-auto">
        {isAvailable ? (
          <div>
            <a
              href={isSafeExternalUrl ? item.url! : "#"}
              onClick={handleCtaClick}
              target={isSafeExternalUrl ? "_blank" : undefined}
              rel={isSafeExternalUrl ? "noopener noreferrer" : undefined}
              className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#06c755] hover:bg-[#05b04b] active:scale-[0.99] text-white font-jp-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06c755] whitespace-nowrap"
            >
              <span>LINE STOREで見る</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
            {showPlaceholderNotice && (
              <p
                role="status"
                className="mt-2.5 text-xs text-[#655e57] text-center bg-[#f4efe5] py-2 px-3 rounded-lg"
              >
                ※購入URL（LINE STORE）が設定されると、こちらから販売ページへ移動します。
              </p>
            )}
          </div>
        ) : (
          /* Coming Soon：灰色背景・白文字（リンクや有効ボタンにはしない） */
          <div
            aria-label={`${item.volume} は現在準備中です（Coming Soon）`}
            className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#9e9891] text-white flex items-center justify-center select-none cursor-default"
          >
            <span className="font-en-eyebrow text-base sm:text-lg font-bold tracking-widest text-white">
              Coming Soon
            </span>
          </div>
        )}
      </div>
    </article>
  );
};
