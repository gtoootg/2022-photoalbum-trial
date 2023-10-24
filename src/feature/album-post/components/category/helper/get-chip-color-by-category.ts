import {Category} from "../../category-and-map/CategoryIconFactory";


export const chipColorByCategory = (category: Category) => {
  if (category === Category.NATURE) {
    return "green";
  }

  if (category === Category.NIGHT_VIEW) {
    return "blue";
  }

  if (category === Category.CITY_VIEW) {
    return "orange";
  }

  if (category === Category.TRAFFIC) {
    return "gray";
  }
};
