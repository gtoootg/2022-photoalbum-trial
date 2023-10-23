import {useGetAlbumPosts} from "../../../../../../../../api/album-posts/use-get-album-posts.hooks";
import {useUpdateAlbumPost} from "../../../../../../../../api/album-posts/use-update-album-post.hooks";
import {
    useAlbumPostEditDescription,
    useAlbumPostEditTitle,
    useAlbumPostTitleAndDescriptionEditMode
} from "../state/use-edit-title-and-desription-in-album-post.hooks";
import {useCallback} from "react";
import {useRouter} from "next/router";

export const useAlbumPostUpdateGeneralInformation = ()=>{
    const router = useRouter();
    const { postId } = router.query;
    const [,setIsEditMode] = useAlbumPostTitleAndDescriptionEditMode()
    const [titleToUpdate, setTitleToUpdate] = useAlbumPostEditTitle()
    const [descriptionToUpdate, setDescriptionToUpdate] =  useAlbumPostEditDescription()

    const{refetch:refetchAlbumPosts} =  useGetAlbumPosts()
    const { mutate,isLoading:isUpdating } = useUpdateAlbumPost({
        onSuccessCallback: () => {
            refetchAlbumPosts()
            setIsEditMode(false)
        },
    });

    const updateAlbumPost = useCallback(()=>{
        if(!postId){
            return
        }
        mutate({
            id: Number(postId),
            title: titleToUpdate,
            description: descriptionToUpdate,
        })
    },[mutate,postId,titleToUpdate,descriptionToUpdate])

    return {updateAlbumPost,isUpdating}
}