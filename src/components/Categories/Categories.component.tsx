import { FC } from "react";

import CategoryCard from "../CategoryCard/CategoryCard.component";

import { CATEGORIES_DATA } from "./categories.data";

import "./Categories.styles.scss";

const Categories: FC = () => {
  return (
    <div className="categories">
      {CATEGORIES_DATA.map((category, i) => (
        <CategoryCard key={category.title} category={category} index={i} />
      ))}
    </div>
  );
};

export default Categories;