import { PostData } from '../../types/types';

export default function getPostQueryParams(post: PostData | undefined) {
  const fromTimestamp = new Date(post?.createdAt.timestamp || 0).toISOString();
  return {
    fromTimestamp,
    fromId: post?.id || 0,
  };
}
