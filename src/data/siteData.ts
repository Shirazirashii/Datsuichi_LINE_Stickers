/**
 * ============================================================================
 * ダツイチー新大陸 公式LINEスタンプ特設サイト - 設定・データ管理ファイル
 * ============================================================================
 * 
 * 今後の主な更新（新しいスタンプVol.の追加、Coming Soonから販売中への切り替え、
 * 画像パスやURLの差し替え、テキスト変更）はこのファイルだけで完結します。
 */

export type StickerStatus = "available" | "coming-soon";

export interface StickerSeriesItem {
  id: string;
  volume: string;
  title: string;
  description: string;
  image: string;
  status: StickerStatus;
  url: string | null;
}

export interface CharacterItem {
  id: string;
  name: string;
  images: string[];
  alt: string;
  speech: string;
  isGroup?: boolean;
}

/**
 * 共通アセット・リンク設定
 * 画像素材が用意でき次第、public/assets/ 直下に配置して上書きしてください。
 */
export const siteConfig = {
  background: {
    mobile: "/assets/bg-mobile.webp",   // 9:16 スマートフォン用背景
    desktop: "/assets/bg-desktop.webp", // 16:9 PC・タブレット横向き用背景
  },
  hero: {
    eyebrow: "Datsuichi Official LINE Stickers",
    titleLine1: "ダツイチー新大陸",
    titleLine2: "公式LINEスタンプ",
    copyLine1: "ダツイチの仲間たちが、",
    copyLine2: "LINEに小さなワクワクを届ける。",
    mainImage: {
      src: "/assets/hero-main.webp",
      alt: "ダツイチくんとエリナーAI（アイ）",
      placeholderLabel: "ダツイチくん ＆ エリナーAI（アイ）",
    },
  },
  world: {
    eyebrow: "THE WORLD",
    title: "ダツイチー新大陸の世界",
    paragraphs: [
      "ここは、まだ見ぬ答えを探して仲間たちが冒険する「ダツイチー新大陸」。",
      "うまくいく日も、ちょっと迷う日も。笑ったり、立ち止まったりしながら、それぞれの一歩を重ねていく世界です。",
    ],
  },
  mainWebsite: {
    logoImage: "/assets/datsuichi-logo-sketch.webp",
    logoAlt: "ダツイチー新大陸 ロゴマーク",
    ctaLabel: "ダツイチー新大陸をもっと知る",
    url: "https://datsuichi-new-continents.netlify.app/",
  },
  footer: {
    organization: "Created by ダツイチー新大陸",
  },
};

/**
 * LINEスタンプ一覧データ
 * 
 * 【更新方法】
 * - Vol.4以降を追加する場合：配列の末尾に新しいオブジェクトを追加してください。
 * - 販売開始する場合：`status` を `"available"` に変更し、`url` に LINE STORE のURLを設定してください。
 */
export const stickerSeries: StickerSeriesItem[] = [
  {
    id: "vol-01",
    volume: "Vol.1",
    title: "日常コミュニケーション編",
    description: "「ありがとう」「了解です」など、毎日のやり取りで使いやすい16種類。",
    image: "/assets/vol01.webp",
    status: "available",
    url: "https://store.line.me/stickershop/product/37709006/ja",
  },
  {
    id: "vol-02",
    volume: "Vol.2",
    title: "クセ強リアクション編",
    description: "驚いたときも困ったときも、ちょっと笑える。遊び心たっぷりの16種類。",
    image: "/assets/vol02.webp",
    status: "coming-soon",
    url: null,
  },
  {
    id: "vol-03",
    volume: "Vol.3",
    title: "お仕事・トラブル編",
    description: "仕事や日常で起こるトラブルも、ちょっとした冒険に変える16種類。",
    image: "/assets/vol03.webp",
    status: "coming-soon",
    url: null,
  },
];

/**
 * キャラクター紹介データ
 */
export const characterList: CharacterItem[] = [
  {
    id: "datsuichi",
    name: "ダツイチくん",
    images: [
      "/assets/datsuichi-01.webp",
      "/assets/datsuichi-02.webp",
      "/assets/datsuichi-03.webp",
      "/assets/datsuichi-04.webp",
    ],
    alt: "ダツイチくんのイラスト",
    speech: "「よし、行ってみよう！」\nワクワクする方へ、まずは一歩。勇気を胸に、仲間と一緒に前へ進む。ちょっぴり不器用な冒険者。",
  },
  {
    id: "elinor-ai",
    name: "エリナーAI（アイ）",
    images: [
      "/assets/elinor-ai-01.webp",
      "/assets/elinor-ai-02.webp",
      "/assets/elinor-ai-03.webp",
      "/assets/elinor-ai-04.webp",
    ],
    alt: "エリナーAI（アイ）のイラスト",
    speech: "「それ、面白そう！」\n明るく好奇心いっぱい。知恵とひらめきで、みんなの冒険を支える頼れるパートナー。",
  },
  {
    id: "monsters",
    name: "モンスターズ",
    images: [
      "/assets/monsters-01.webp",
      "/assets/monsters-02.webp",
      "/assets/monsters-03.webp",
    ],
    alt: "モンスターズ（3〜4体グループ）のイラスト",
    speech: "「怖い？」「かわいい？」「クセが強い？」\n気づけば好きになっている、個性豊かなモンスターたち。冒険の先で出会う、ちょっと愉快なこの世界の住人たち。",
    isGroup: true,
  },
];
