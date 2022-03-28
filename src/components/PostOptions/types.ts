export interface PostOptionsProps {
  show: boolean;
  owner: number;
  postId: number;
  type: 'post' | 'postView' | 'comment';
  mods?: string[];
}

export type OptionsListProps = {
  deletePost: boolean;
  copyLink: boolean;
};
