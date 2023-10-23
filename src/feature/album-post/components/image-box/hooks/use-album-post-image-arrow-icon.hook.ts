import { useMemo } from "react";
import { useRouter } from "next/router";
import {
  useGetAlbumPosts,
  useGetAlbumPostsSelector,
} from "../../../../../api/album-posts/use-get-album-posts.hooks";
import {
  useAlbumPostTitleAndDescriptionEditMode
} from "../../general-information/components/text-box/edit-mode/state/use-edit-title-and-desription-in-album-post.hooks";

export const useAlbumPostImageArrowIconConfig = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: albumPosts } = useGetAlbumPostsSelector();
  const [,setEditMode] = useAlbumPostTitleAndDescriptionEditMode()

  return useMemo(() => {
    if (!albumPosts) {
      return undefined;
    }

    const sx = { size: "100px", color: "white" };

    const indexOfCurrentAlbumPost = albumPosts.findIndex(({ id }) => {
      if (typeof postId !== "string") {
        return false;
      }
      return id === Number(postId);
    });

    const isFirstPost = indexOfCurrentAlbumPost === 0;
    const isLastPost = indexOfCurrentAlbumPost === albumPosts.length - 1;

    const incrementedAlbumPostId = !isLastPost
      ? albumPosts[indexOfCurrentAlbumPost + 1].id
      : undefined;
    const decrementedAlbumPostId = !isFirstPost
      ? albumPosts[indexOfCurrentAlbumPost - 1].id
      : undefined;

    const handleClickRight = () => {
      if (incrementedAlbumPostId === undefined) {
        return;
      }
      setEditMode(false)
      router.push(`/album-posts/${incrementedAlbumPostId}`);
    };
    const handleClickLeft = () => {
      if (decrementedAlbumPostId === undefined) {
        return;
      }
      setEditMode(false)
      router.push(`/album-posts/${decrementedAlbumPostId}`);
    };

    return {
      ...sx,
      onClickRight: isLastPost ? undefined : handleClickRight,
      onClickLeft: isFirstPost ? undefined : handleClickLeft,
    };
  }, [postId, albumPosts]);
};
