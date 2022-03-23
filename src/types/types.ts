export interface ModalChildProps {
  closeModal: () => void;
}

export type LocationStateProps = {
  backgroundLocation?: string;
};

export interface LocationModalChildProps {
  setModalHeading?: (heading: string) => void;
  defaultHeading?: string;
  closeModal: () => void;
}

export type UserAvatarData = {
  name: string;
  url: string;
  data?: string;
};

export type UserData = {
  id: number;
  email: string;
  login: string;
  username: string;
  isActivated: boolean;
  about: string;
  avatar: UserAvatarData;
  role: {
    loc_ru: string;
    val: string;
  };
};

type OtherUserProps = {
  currentUserSubscribed?: boolean;
};

export type ExtendedUserData = UserData & OtherUserProps;

export type UserUpdateData = {
  username: string;
  about: string;
  avatar: UserAvatarData;
};

export type ProfileStats = {
  subsToCount: number,
  subsFromCount: number,
  postsCount: number,
};

export type UserLoginData = {
  loginOrEmail: string;
  password: string;
};

export type UserRegistrationData = {
  login: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export type SubsCountObject = {
  userSubsCount: number;
  targetSubsCount: number;
};

export interface IUserStore {
  user: UserData | null;
  isAuth: boolean;
  login(loginData: UserLoginData): Promise<void>;
  registration(data: UserRegistrationData): Promise<void>;
  logout(): Promise<void>;
  updateUser(data: object): Promise<void>;
  // updateAvatar(avatarData: string): void;
  sendNewActivationMail(): Promise<Date>;
  getActivationMailCooldown(): Promise<Date | null>;
  checkAuthorization(): Promise<void>;
  subscribeToUser(id: number): Promise<SubsCountObject | undefined>;
  unsubscribeFromUser(id: number): Promise<SubsCountObject | undefined>;
  getUserData(login: string): Promise<ExtendedUserData | undefined>;
  getProfileStats(userId: number): Promise<ProfileStats | undefined>;
}

export type UserDataWithTokens = {
  accessToken: string;
  refreshToken: string;
  user: UserData;
};
