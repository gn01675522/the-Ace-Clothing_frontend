import { CategoryCard } from "../../components/category-card/CategoryCard.component";

import { CATEGORIES_DATA } from "./categories.data";

import type { FC } from "react";

import "./Categories.styles.scss";

export const Categories: FC = () => {
  return (
    <div className="categories">
      {CATEGORIES_DATA.map((category, i) => (
        <CategoryCard key={category.title} category={category} index={i} />
      ))}
    </div>
  );
};
