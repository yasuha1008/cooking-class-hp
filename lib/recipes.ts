export type Recipe = {
  slug: string;
  category: "中華" | "居酒屋";
  title: string;
  summary: string;
  photo?: string;
  videoUrl?: string;
  ingredients: string[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "mapo-tofu",
    category: "中華",
    title: "麻婆豆腐",
    summary: "彩仙龍の定番、本格四川風の麻婆豆腐。",
    photo: "/photos/dish-plating.jpg",
    videoUrl: "",
    ingredients: [
      "絹豆腐 1丁",
      "豚ひき肉 100g",
      "豆板醤・甜麺醤・にんにく・しょうが 各適量",
      "鶏がらスープ 200ml",
      "片栗粉(水溶き)",
    ],
    steps: [
      "豆腐を軽く塩茹でして下味をつけ、水気を切っておく",
      "香味野菜とひき肉を油でしっかり炒め、香りを立たせる",
      "調味料を加えて煮立たせ、スープを加える",
      "豆腐を加えて煮込み、最後に水溶き片栗粉でとろみをつける",
    ],
  },
  {
    slug: "yurinji",
    category: "中華",
    title: "油淋鶏",
    summary: "カリッと揚げた鶏肉に、特製の甘酢ダレをかけた一品。",
    photo: "/photos/cooking.jpg",
    videoUrl: "",
    ingredients: [
      "鶏もも肉 1枚",
      "塩・こしょう・酒(下味用)",
      "片栗粉(揚げ衣用)",
      "醤油・酢・砂糖・長ねぎ・しょうが(タレ用)",
    ],
    steps: [
      "鶏肉に下味をつけ、片栗粉をまぶす",
      "低温からじっくり揚げ、最後に高温でカリッと仕上げる",
      "タレの材料を合わせてひと煮立ちさせる",
      "食べやすく切った鶏肉にタレをかけて完成",
    ],
  },
  {
    slug: "motsuni",
    category: "居酒屋",
    title: "もつ煮込み",
    summary: "じっくり煮込んだ、居酒屋の定番おつまみ。",
    photo: "/photos/cooking.jpg",
    videoUrl: "",
    ingredients: [
      "豚もつ(下処理済み) 300g",
      "大根・こんにゃく・長ねぎ",
      "味噌・醤油・砂糖・生姜",
    ],
    steps: [
      "もつを下茹でし、臭みを取る",
      "大根・こんにゃくと一緒に、じっくり煮込む",
      "味噌・醤油ベースの味付けで、さらに煮込む",
      "長ねぎを加えて仕上げる",
    ],
  },
];
