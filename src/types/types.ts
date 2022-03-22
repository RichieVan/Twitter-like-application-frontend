type LocationStateProps = {
  backgroundLocation?: string;
};

interface LocationModalChildProps {
  setModalHeading?: (heading: string) => void;
  defaultHeading?: string;
  closeModal: () => void;
}

export type UserAvatarData = {
  name: string;
  url: string;
  data?: string;
};

type UserData = {
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

type ExtendedUserData = UserData & OtherUserProps;

type UserUpdateData = {
  username: string;
  about: string;
  avatar: UserAvatarData;
};

type ProfileStats = {
  subsToCount: number,
  subsFromCount: number,
  postsCount: number,
};

export type UserLoginData = {
  loginOrEmail: string;
  password: string;
};

type UserRegistrationData = {
  login: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

type SubsCountObject = {
  userSubsCount: number;
  targetSubsCount: number;
};

interface IUserStore {
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

type UserDataWithTokens = {
  accessToken: string;
  refreshToken: string;
  user: UserData;
};

export {
  LocationStateProps,
  LocationModalChildProps,
  IUserStore,
  UserRegistrationData,
  UserDataWithTokens,
  ExtendedUserData,
  ProfileStats,
  SubsCountObject,
  UserUpdateData,
  UserData,
};
