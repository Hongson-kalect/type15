export interface IAppUser {
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

export interface IUser {
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
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVerificationToken {
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}

export interface IAuthenticator {
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

export interface INovel {
  isDeleted: boolean;
  id: number;
  defaultLanguageId: string;
  defaultLanguage: ILanguage;
  userId: number;
  user: IAppUser;
  level?: string;
  name?: string;
  rate?: number;
  rateTime?: number;
  price?: string;
  unit?: string;
  isPrivate: boolean;
  tag?: string;
  desc?: string;
  paragraphs: IParagraph[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IParagraph {
  isDeleted: boolean;
  id: number;
  languageId: number;
  language: ILanguage;
  header: string;
  content: string;
  desc: string;
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
  novel: INovel;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile {
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
