import { Descendant, Node } from "slate";

export interface IAppUser {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  language?: ILanguage;
  languageId?: number;
  username?: string;
  password?: string;
  scope: string;
  access_token?: string;
  refresh_token?: string;
  recoverEmail?: string;
  ban?: IBan;
  favorite?: IFavorite[];
  novels?: INovel[];
  paragraph?: IParagraph[];
  score?: IScore[];
  //   rank: IRank[];
  //   rate: IRate[];
  report?: Report[];
  userId: string;
  user: IUser;
  profileId?: number;
  profile?: IProfile;
  settingId?: number;
  setting?: ISetting;
  assetId?: number;
  asset?: IAsset;

  devices?: IDevice[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  _count?: {
    [key: string]: number;
  };
  isDeleted?: boolean;
  id?: number;
  userId: number;
  user?: IAppUser;
  paragraphId?: number;
  paragraph?: IParagraph;
  novelId?: number;
  novel?: INovel;
  themeId?: number;
  theme?: ITheme;

  title?: string;
  content: string;
  qill?: string;
  index?: string;
  parentId?: number; // Đây là khóa ngoại tham chiếu đến chính bảng Item
  parent?: IComment;
  children?: IComment[];
  createdAt?: Date;
  updatedAt?: Date;

  state?: "sending" | "success" | "error";
  targetField: "paragraphId" | "themeId" | "novelId";
  targetColumn: number;
}

export interface IUser {
  _count?: {
    [key: string]: number;
  };
  id: string;
  name?: string;
  email?: string;
  emailVerified: Date;
  image?: string;
  accounts: IAccount[];
  sessions: ISession[];
  Authenticator: IAuthenticator[];
  appUser?: IAppUser;
  language?: ILanguage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccount {
  _count?: {
    [key: string]: number;
  };
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface ISession {
  _count?: {
    [key: string]: number;
  };
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVerificationToken {
  _count?: {
    [key: string]: number;
  };
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}

export interface IAuthenticator {
  _count?: {
    [key: string]: number;
  };
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string;
  user: IUser;
}

export interface IAsset {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  gold: number;
  crystal: number;
  themes: string[];
  user: IAppUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBan {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  userId: string;
  user: IAppUser;
  time: Date;
  permanent: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDevice {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  userId: string;
  user: IAppUser;
  ip: string;
  time: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFavorite {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  userId: string;
  user: IAppUser;
  type: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGame {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  name: string;
  tag: string;
  genre: string;
  gameInfo: IGameInfo[];
  defaultLanguageId: number;
  defaultLanguage: ILanguage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGameInfo {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  played: number;
  stage: string;
  completed: number;
  isNew: boolean;
  hotPoint: number;
  recoverEmail: string;
  ban: string;
  gameId: string;
  game: IGame;
  languageId: string;
  languages: ILanguage;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILanguage {
  _count?: {
    [key: string]: number;
  };
  isDeleted?: boolean;
  id?: number;
  name: string;
  code: string;
  flag: string;
  desc?: string;
  gameInfo?: IGameInfo[];
  paragraphs?: IParagraph[];
  gameDefaultLanguage?: IGame[];
  novelDefaultLanguage?: INovel[];
  setting?: ISetting[];
  typeStyle?: ITypeStyle[];
  word?: IWord[];
  wordRate?: IWordRate[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICurrency {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  name: string;
  icon?: string;
  paragraphs: IParagraph[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INovel {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  languageId: number;
  language: ILanguage;
  userId: number;
  user: IAppUser;
  level?: string;
  name?: string;
  rate?: number;
  rateTime?: number;
  unit?: string;
  isPrivate: boolean;
  tag?: string;
  desc?: string;
  image?: string;
  scope?: "public" | "protected" | "private";
  protectedType?: "pass" | "sell";
  password?: string;
  price?: number;
  priceUnitId?: number;
  priceUnit?: ICurrency;
  paragraphs: IParagraph[];
  references?: INovel[];
  like: ILike[];
  favorite: IFavorite[];
  report: IReport[];
  status: "ongoing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface IParagraph {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  languageId: number;
  language: ILanguage;
  title: string;
  content: string;
  desc?: string;
  scope: string;
  protectedType: string;
  password?: string;
  price?: number;
  priceUnitId?: number;
  chapter?: string | number;
  rate: number;
  rateTime: number;
  prev?: string;
  next?: string;
  isPrivate: boolean;
  completed: number;
  userId: number;
  user: IAppUser;
  novelId: number;
  novel?: INovel;
  references?: IParagraph[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILike {
  isDeleted: boolean;
  id: number;
  userId: number;
  user: IAppUser;
  createdAt: Date;
  updatedAt: Date;

  novelId?: number;
  novel?: INovel;
  paragraphId?: number;
  paragraph?: IParagraph;
  themeId?: number;
  theme?: ITheme;
}

export interface IProfile {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: string;
  born: number;
  gender: boolean;
  firstName: string;
  lastName: string;
  displayName?: string;
  nation: string;
  avatar?: string;
  role?: string;
  user: IAppUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReport {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: string;
  userId: number;
  user: IAppUser;
  reportType: string;
  desc: string;

  novelId: string;
  novel: INovel;
  paragraphId?: number;
  paragraph?: IParagraph;
  themeId?: number;
  theme?: ITheme;
  createdAt: Date;
  updatedAt: Date;
}

export interface IScore {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: string;
  userId: number;
  user: IAppUser;
  type: string;
  targetId: number;
  wpm: number;
  cpm: number;
  score: number;
  wAccuracy: number;
  time: number;
  cAccuracy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISetting {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  user: IAppUser;
  languageId: number;
  language: ILanguage;
  themes: string[];
  typeStyleId: number;
  typeStyle: ITypeStyle;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStore {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  themeId: number;
  themes: string;
  price: number;
  unit: string;
  desc: string;
  rate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITheme {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  type: string;
  src: string;
  style: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITypeStyle {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  languageId: number;
  language: ILanguage;
  setting: ISetting[];
  specialRule: ISpecialRule[];
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpecialRule {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  typeStyleId: number;
  typeStyle: ITypeStyle;
  input: string;
  output: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWord {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  languageId: number;
  language: ILanguage;
  level: string;
  type: string;
  words: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWordRate {
  _count?: {
    [key: string]: number;
  };
  isDeleted: boolean;
  id: number;
  languageId: number;
  language: ILanguage;
  rate: string;
  level: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITraining {
  isDeleted?: boolean;
  id?: number;
  title: string;
  content: string;
  qill: Descendant[];
  index?: string;
  parentId?: number; // Đây là khóa ngoại tham chiếu đến chính bảng Item
  parent?: ITraining;
  children?: ITraining[];
  historys?: IHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHistory {
  isDeleted: boolean;
  id: number;
  userId: number;
  user?: IAppUser;
  paragraphId?: number;
  paragraph?: IParagraph;
  novelId?: number;
  novel?: INovel;
  trainingId?: number;
  training?: ITraining;
  time: Date[];
  createdAt: Date;
  updatedAt: Date;
}
