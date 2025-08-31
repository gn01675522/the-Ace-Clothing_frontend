import { NavLink, useMatch } from "react-router-dom";

import type { FC } from "react";

import "./CategoryCard.styles.scss";

type PathTypeInCategory = {
  admin: string;
  user: string;
};

type CategoryType = {
  title: string;
  url: string;
  path: PathTypeInCategory;
};

type CategoryCardProps = {
  category: CategoryType;
  index: number;
};

export const CategoryCard: FC<CategoryCardProps> = ({ category, index }) => {
  const { title, url, path } = category;
  const cardNumber = index + 1;
  const match = useMatch("admin/products");

  return (
    <NavLink
      to={match ? path.admin : path.user}
      className={`category-card category-card-${cardNumber}`}
    >
      <img
        src={url}
        className="category-card__img"
        alt={`category card: ${title}`}
      />
      <div className="category-card__content">
        <h3 className="category-card__content-title">{title}</h3>
      </div>
    </NavLink>
  );
};
