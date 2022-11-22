import { Table } from "../../../helper/server/sqlHelperFunction";
import { connection } from "../../../server/mysql";

export const getDataOfLastInsertedPostIdFromFlickrPhotoIdTable = (
  lastInsertedPostId,
  dataOfFlickrPhotoIdTableFilteredByLastInsertIdOfPostTable
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from ${Table.FLICKR_PHOTO_ID} where postId= ${lastInsertedPostId}`,
      (error, data) => {
        if (error) {
          return reject(error);
        }
        dataOfFlickrPhotoIdTableFilteredByLastInsertIdOfPostTable = data;
        resolve(data);
      }
    );
  });
};

export const composePayloadForCategoryIdTable = (
  dataOfFlickrPhotoIdTableFilteredByLastInsertIdOfPostTable,
  flickrPhotoIdsForSelectedCategories
) => {
  const findPrimaryKeyIdOfFlickrPhotoId = (flickrPhotoId) =>
    dataOfFlickrPhotoIdTableFilteredByLastInsertIdOfPostTable.filter(
      (data) => data.flickrPhotoId === flickrPhotoId
    )[0].id;

  const payloadOfFlickrPhotoIdsForOneCategory = (
    flickrPhotoIdsForOneCategory,
    categoryId
  ) =>
    flickrPhotoIdsForOneCategory.map((flickrPhotoId) => ({
      categoryId: categoryId,
      tableRowIdOfFlickrPhotoIdTable:
        findPrimaryKeyIdOfFlickrPhotoId(flickrPhotoId),
    }));

  for (const flickrPhotoIdsForSelectedCategory of flickrPhotoIdsForSelectedCategories) {
  }
  // const payload = flickrPhotoIdsForSelectedCategories.map((flickrPhotoIdsForSelectedCategory,categoryId)=>{

  // })
};
