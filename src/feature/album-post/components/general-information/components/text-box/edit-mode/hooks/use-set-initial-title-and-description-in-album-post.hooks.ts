import {useEffect, useState} from "react";
import {useGetAlbumPostData} from "../../../../../../hooks/use-get-album-post.hooks";
import {useRouter} from "next/router";
import {
    useAlbumPostEditDescription,
    useAlbumPostEditTitle,
    useAlbumPostTitleAndDescriptionEditMode
} from "../state/use-edit-title-and-desription-in-album-post.hooks";

export const useSetInitialTitleAndDescriptionInAlbumPost = ()=>{
    const router = useRouter();
    const { postId } = router.query;
    const { albumPost } = useGetAlbumPostData();
    const [, setIsEditMode] = useAlbumPostTitleAndDescriptionEditMode()
    const [, setTitleToUpdate] = useAlbumPostEditTitle()
    const [, setDescriptionToUpdate] =  useAlbumPostEditDescription()



    useEffect(()=>{
        if(!albumPost){
            return
        }
        setTitleToUpdate(albumPost.title)
        setDescriptionToUpdate(albumPost.description)
    },[albumPost])

}