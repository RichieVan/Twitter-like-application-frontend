import { AxiosResponse } from 'axios';
import { ReactElement } from 'react';

export type RequestPromise<T> = Promise<AxiosResponse<T>>;

export interface ModalChildProps {
  closeModal: () => void;
}

export type LocationStateProps = {
  backgroundLocation?: string;
  authRedirected?: string;
};

export interface LocationModalChildProps {
  setModalHeading?: (heading: string) => void;
  defaultHeading?: string;
  closeModal?: () => void;
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

export type ProfileStatsData = {
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
  getProfileStats(userId: number): Promise<ProfileStatsData | undefined>;
}

export type UserDataWithTokens = {
  accessToken: string;
  refreshToken: string;
  user: UserData;
};

export type PostRequestParams = {
  fromTimestamp?: string;
  fromId?: number;
  forSubs?: boolean;
};

export type NewPostData = {
  textContent: string;
  userId: number;
};

export type BaseNewCommentData = {
  textContent: string;
  userId: number;
  postId: number;
};

export type NewCommentData = BaseNewCommentData & {
  params: PostRequestParams;
};

export type PostUserData = {
  id: number;
  login: string;
  username: string;
  avatar: UserAvatarData;
};

type PostTimestampObject = {
  timestamp: string;
  title: string;
  view: string;
};

export type PostData = {
  id: number;
  createdAt: PostTimestampObject;
  updatedAt: PostTimestampObject;
  textContent: string;
  user: PostUserData;
  commentsCount: number;
  likesCount: number;
  currentUserLiked: boolean;
  contentArray?: ReactElement[];
};

export type FetchedPostsData = {
  posts: PostData[];
  canLoadMore: boolean;
};

export type CurrentList = {
  type: 'feed' | null;
};

export interface IPostStore {
  feedPostsList: PostData[] | null;
  firstLoaded: PostData | null;
  lastLoaded: PostData | null;
  canLoadMore: boolean;
  syncing: boolean;
  syncFunction: (() => void) | null;
  currentList: CurrentList;
  feedType: 'subs' | 'all';
  canChangeFeedType: boolean;
  setSyncing(state: boolean): void;
  setSyncFunction(state: () => void): void;
  setCurrentList(state: CurrentList): void;
  setCanLoadMore(state: boolean): void;
  setFeedPostsList(state: PostData[] | null): void;
  setFeedType(state: 'subs' | 'all'): void;
  setCanChangeFeedType(state: boolean): void;
  deleteFromFeedPostsList(id: number): void;
  createPost(postData: NewPostData): Promise<void>;
  fetchPosts(): Promise<PostData[]>;
  loadMorePosts(): Promise<boolean>;
  syncPosts(): Promise<void>;
  deletePost(id: number): Promise<void>;
  loadMoreUserPosts(userId: number, fromPost: PostData): Promise<FetchedPostsData>;
}

export type AppStoreAliases = {
  [name: string]: string;
};

export type PostType = 'post' | 'postView' | 'comment';

export type ActivePostOptions = {
  id: number;
  type: PostType;
};

export interface IAppStore {
  isFirstLoading: boolean;
  isGlobalLoading: boolean;
  activePostOptions: ActivePostOptions | null;
  userStore: IUserStore;
  aliases: AppStoreAliases;
  setFirstLoading(state: boolean): void;
  setGlobalLoading(state: boolean): void;
  setActivePostOptions(state: ActivePostOptions | null): void;
  preloader(): Promise<void>;
}

export type ModalOptions = {
  heading?: string;
  temporal?: boolean;
};

type ModalDataProps = {
  modalName: string;
  heading: string;
  temporal: boolean;
};

export type ModalData = {
  element: ReactElement;
  props: ModalDataProps;
};

export interface IModalStore {
  namesList: string[];
  active: string[];
  modals: ModalData[];
  openModal(element: JSX.Element, options: ModalOptions): void;
  addModal(element: JSX.Element, options: ModalOptions): void;
  deleteFromModalsList(modalName: string): void;
  deleteFromNamesList(modalName: string): void;
  setModalActive(modalName: string, value: boolean): void;
  setBodyUnscrollable(value: boolean): void;
}

export type NotificationType = 'info' | 'success' | 'error';

export type Notification = {
  id: number;
  content: string;
  timeout: number;
  type: NotificationType;
};

export interface INotificationInterface {
  notifications: Notification[];
  idCounter: number;
  show(content: string, timeout: number, type: NotificationType): void;
  clear(id: number): void;
  incrementCounter(): number;
}

export type PostViewParams = {
  id: string;
};

type LayoutVariants = 'default' | 'auth';

export interface LayoutProps {
  type: LayoutVariants;
}

export type ApiErrorData = {
  message: string;
  errors: string[];
};

export type ApiErrorProps = {
  message?: string;
  errors?: string[];
};

export interface IApiError {
  errors: string[];
}
