import { KeyResultType } from "@/interface/type/typing";

type CalcuResultProps = {
  correctArray: string[];
  userInputArray: string[];
  failedCount: number;
  time: number;
};

export const calcuResult = ({
  correctArray,
  userInputArray,
  failedCount,
  time,
}: CalcuResultProps) => {
  const totalWords = correctArray.length;
  const totalChars = correctArray.join("").length;
  const keyResult: KeyResultType[] = [];

  let correctWords = 0;
  let failWords = 0;
  let correctChars = 0;
  let failChars = failedCount;

  correctArray.map((correctWord, index) => {
    const typedWord = userInputArray[index];
    if (typedWord === correctWord) {
      correctWords += 1;
      correctChars += correctWord.length;
    } else {
      failWords += 1;
      for (let i = 0; i < Math.max(correctWord.length, typedWord.length); i++) {
        if (correctWord[i] !== typedWord[i]) {
          failChars += 1;
        } else {
          correctChars += 1;
        }
      }
    }

    for (let i = 0; i < Math.max(correctWord.length, typedWord.length); i++) {
      const char = correctWord[i];
      const typedChar = typedWord[i];

      if (!char) continue;

      let key = keyResult.find((item) => item.char === char);
      if (!key) {
        key = {
          char,
          total: 0,
          accuracy: 0,
        };
        keyResult.push(key);
      }
      key.total += 1;

      if (char === typedChar) {
        key.accuracy += 1;
      }
    }
  });

  const wpm = Math.floor((correctWords / time) * 60);
  const cpm = Math.floor((correctChars / time) * 60);

  const wAccuracy = Math.floor((correctWords / totalWords) * 10000) / 100;
  const cAccuracy = Math.floor((correctChars / totalChars) * 10000) / 100;

  const score =
    Math.floor(
      Math.sqrt(
        (correctWords * correctChars * wAccuracy * cAccuracy) / (time || 1)
      )
    ) / 10;

  return {
    score: {
      score,
      wpm,
      cpm,
      wAccuracy,
      cAccuracy,
      time,
    },
    typedResult: {
      correctWords,
      failWords,
      totalWords,
      correctChars,
      failChars,
      totalChars,
      time,
    },
    keyResult: keyResult,
  };
};


export const getWord = ({
  language,
  level = "basic",
}: {
  language?: number;
  level?: "basic" | "normal" | "hard" | "expert" | "master";
  wordRate?: number;
}) => {
  //level này sẽ lấy từ settings
  // wordRate and words should be fetched from server

  let addWord = "";
  while (addWord.split(" ").length < 30) {
    const gacha = Math.floor(Math.random() * 100);
    let wordType = "";
    const selectedWordType = Object.entries(wordRate[level]).find(
      ([key, value]) => {
        return value >= gacha;
      }
    );

    if (selectedWordType) wordType = selectedWordType[0];

    const wordLib = words.vi?.[wordType] || [];

    const wordIndex = Math.floor(Math.random() * wordLib.length);

    if (wordType === "baseSpe" || wordType === "advanceSpe")
      addWord += wordLib[wordIndex];
    else {
      addWord += " " + wordLib[wordIndex];
    }
  }

  return addWord.trim();
};

export const words = {
  vi: {
    easy: [
      "bàn",
      "đèn",
      "ghế",
      "nhà",
      "cửa",
      "sách",
      "bút",
      "trời",
      "nước",
      "cơm",
      "áo",
      "mắt",
      "tay",
      "chân",
      "hoa",
      "cây",
      "đất",
      "xe",
      "biển",
      "điện",
      "chăn",
      "gối",
      "mèo",
      "chó",
      "con",
      "ông",
      "bà",
      "bố",
      "mẹ",
      "bé",
      "trẻ",
      "trứng",
      "cá",
      "gà",
      "thóc",
      "lúa",
      "mía",
      "chuối",
      "cam",
      "quýt",
      "xoài",
      "đào",
      "mận",
      "dưa",
      "khoai",
      "ngô",
      "hạt",
      "cau",
      "trầu",
      "chợ",
      "phố",
      "đường",
      "làng",
      "xóm",
      "bến",
      "cầu",
      "thuyền",
      "tàu",
      "nhạc",
      "hát",
      "kịch",
      "sân",
      "khấu",
      "trường",
      "lớp",
      "bảng",
      "phấn",
      "gương",
      "kính",
      "dao",
      "kéo",
      "thớt",
      "nồi",
      "chảo",
      "giày",
      "dép",
      "quần",
      "tất",
      "áo",
      "mũ",
      "nón",
      "dây",
      "thắt",
      "lưng",
      "điện",
      "máy",
      "tính",
      "bàn",
      "phím",
      "chuột",
      "màn",
      "hình",
      "ti",
      "vi",
      "tủ",
      "bếp",
      "quạt",
      "điều",
      "hòa",
    ],
    easys: [
      "bàn ghế",
      "đèn pin",
      "nhà bếp",
      "cửa sổ",
      "sách vở",
      "bút chì",
      "trời xanh",
      "nước ngọt",
      "cơm tấm",
      "áo dài",
      "mắt kính",
      "tay nắm",
      "chân bàn",
      "hoa hồng",
      "cây cối",
      "đất cát",
      "xe đạp",
      "biển cả",
      "điện thoại",
      "chăn mền",
      "gối ôm",
      "mèo con",
      "chó con",
      "con trai",
      "ông nội",
      "bà ngoại",
      "bố mẹ",
      "bé gái",
      "trẻ con",
      "trứng gà",
      "cá chép",
      "gà trống",
      "thóc lúa",
      "lúa mạch",
      "mía đường",
      "chuối tiêu",
      "cam sành",
      "quýt ngọt",
      "xoài cát",
      "đào tiên",
      "mận hậu",
      "dưa gang",
      "khoai tây",
      "ngô ngọt",
      "hạt điều",
      "cau trầu",
      "chợ đêm",
      "phố cổ",
      "đường phố",
      "làng quê",
      "xóm nhỏ",
      "bến cảng",
      "cầu tre",
      "thuyền buồm",
      "tàu ngầm",
      "nhạc cụ",
      "hát chèo",
      "kịch nói",
      "sân khấu",
      "trường học",
      "lớp học",
      "bảng đen",
      "phấn trắng",
      "gương soi",
      "kính mát",
      "dao kéo",
      "thớt gỗ",
      "nồi đất",
      "chảo gang",
      "giày da",
      "dép lê",
      "quần dài",
      "tất chân",
      "áo khoác",
      "mũ bảo hiểm",
      "nón lá",
      "dây thừng",
      "thắt lưng",
      "điện thoại",
      "máy tính",
      "bàn phím",
      "chuột máy",
      "màn hình",
      "ti vi",
      "tủ lạnh",
      "bếp ga",
      "quạt máy",
    ],
    normal: [
      "thư",
      "gi��o",
      "pháp",
      "kế",
      "nghĩa",
      "danh",
      "phẩm",
      "lịch",
      "sử",
      "quốc",
      "giá",
      "văn",
      "hóa",
      "chính",
      "trị",
      "kinh",
      "tế",
      "xã",
      "hội",
      "khoa",
      "học",
      "triết",
      "lý",
      "ngữ",
      "pháp",
      "đạo",
      "phật",
      "giá",
      "trị",
      "tài",
      "năng",
      "quản",
      "lý",
      "phát",
      "triển",
      "dân",
      "chủ",
      "giáo",
      "dục",
      "bệnh",
      "viện",
      "hành",
      "chính",
      "công",
      "trình",
      "môi",
      "trường",
      "nguyên",
      "tắc",
      "năng",
      "lượng",
      "hệ",
      "thống",
      "giáo",
      "trình",
      "luận",
      "văn",
      "hội",
      "thảo",
      "văn",
      "nghệ",
      "kỹ",
      "thuật",
      "công",
      "nghệ",
      "ngân",
      "hàng",
      "thương",
      "mại",
      "dịch",
      "vụ",
      "lập",
      "trình",
      "bản",
      "quyền",
      "quảng",
      "cáo",
      "nhân",
      "sự",
      "tâm",
      "lý",
      "tài",
      "chính",
    ],
    normals: [
      "hữu nghị",
      "chính xác",
      "xây dựng",
      "phát minh",
      "tích cực",
      "tiến bộ",
      "hiệu quả",
      "cân nhắc",
      "chấp nhận",
      "từ chối",
      "lập luận",
      "thiết kế",
      "kỹ thuật",
      "nhận thức",
      "xu hướng",
      "trách nhiệm",
      "điều chỉnh",
      "giải quyết",
      "phổ biến",
      "tác động",
    ],
    hards: [
      "triết học",
      "siêu hình",
      "phản biện",
      "thực tiễn",
      "nhận thức",
      "ngữ nghĩa",
      "khoa học",
      "tư duy",
      "khái niệm",
      "hữu ích",
      "triển khai",
      "phân tích",
      "lý thuyết",
      "tâm lý",
      "nghiên cứu",
      "chuyển đổi",
      "triển vọng",
      "mô hình",
      "đối tượng",
      "phương pháp",
      "triết lý",
      "phân loại",
      "siêu âm",
      "đối nghịch",
      "khuynh hướng",
      "nghiên cứu",
      "tương tác",
      "thực hành",
      "giải pháp",
      "phức hợp",
      "cơ bản",
      "thành tựu",
      "phát triển",
      "bảo đảm",
      "hài hòa",
      "cảm nhận",
      "phân tích",
      "nguy cơ",
      "trực giác",
      "khách quan",
    ],
    extreme: [
      "hệ thống",
      "phức tạp",
      "triển vọng",
      "phương pháp",
      "biến đổi",
      "tương tác",
      "phát triển",
      "bảo mật",
      "tích hợp",
      "đột biến",
      "cơ sở",
      "khuynh hướng",
      "định hướng",
      "phản biện",
      "phân tích",
      "thực hiện",
      "phản ứng",
      "tư duy",
      "khái niệm",
      "nghiên cứu",
      "khái quát",
      "định nghĩa",
      "phân quyền",
      "tính năng",
      "chuyển hoá",
      "biên dịch",
      "cân đối",
      "phân hoá",
      "tăng cường",
      "hệ trọng",
      "tương đồng",
      "siêu nhiên",
      "triển khai",
      "tích luỹ",
      "tối giản",
      "bền vững",
      "kế thừa",
      "khả năng",
      "thỏa thuận",
    ],
    baseSpe: [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "=",
      "+",
      "[",
      "]",
      "{",
      "}",
      ";",
      ":",
      "'",
      '"',
      ",",
      ".",
      "<",
      ">",
      "/",
      "?",
    ],
    advanceSpe: [
      "{",
      "}",
      "[",
      "]",
      "(",
      ")",
      "<",
      ">",
      "/",
      "\\",
      "|",
      "~",
      "`",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "_",
      "-",
      "+",
      "=",
      "!",
    ],
    number: [],
  },
};

export const wordRate = {
  basic: {
    easys: 50,
    easy: 70,
    normals: 100,
  },
  normal: {
    easy: 30,
    normal: 60,
    easys: 70,
    normals: 90,
    hards: 100,

    uppercaseFirst: 5,
    uppercase: 7,
  },
  extreme: {
    easy: 5,
    normal: 15,
    easys: 20,
    normals: 30,
    hards: 50,
    extreme: 70,
    baseSpe: 90,
    advanceSpe: 100,
    uppercaseFirst: 10,
    uppercase: 15,
  },
  master: {
    normal: 20,
    normals: 30,
    hards: 40,
    extreme: 65,
    baseSpe: 85,
    advanceSpe: 100,
    uppercaseFirst: 20,
    uppercase: 28,
    freeUppercase: 33,
  },
};
