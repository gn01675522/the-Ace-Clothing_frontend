import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import { Pagination } from "../../features/navigation/index";
import Loading from "../../components/Loading/Loading.component";
import {
  ProductModal,
  fetchAdminProductAsync,
  selectAdminProductIsLoading,
  selectAdminProducts,
  selectAdminMensProducts,
  selectAdminWomensProducts,
  selectAdminHatsProducts,
  selectAdminShoesProducts,
  selectAdminAccessoriesProducts,
} from "../../features/product/index";
import { AdminTable } from "../../modules/index";

import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules/index";
import { Button, BUTTON_TYPE_CLASS } from "../../components/index";

import type { FC } from "react";
import type { AdminProduct } from "../../features/product/DTOs/adminProduct.types";

import "./AdminProducts.styles.scss";

enum CATEGORY {
  all = "all",
  mens = "mens",
  womens = "womens",
  hats = "hats",
  shoes = "shoes",
  accessories = "accessories",
}

//* 根據傳入 category 來決定 return 哪個 selector
const categoryData = (category: CATEGORY) =>
  ({
    [CATEGORY.all]: selectAdminProducts,
    [CATEGORY.mens]: selectAdminMensProducts,
    [CATEGORY.womens]: selectAdminWomensProducts,
    [CATEGORY.hats]: selectAdminHatsProducts,
    [CATEGORY.shoes]: selectAdminShoesProducts,
    [CATEGORY.accessories]: selectAdminAccessoriesProducts,
  }[category]);

type CreateOrEditType = "create" | "edit";

const tableColumns = [
  { header: "分類", accessor: "category" },
  { header: "名稱", accessor: "title" },
  { header: "售價", accessor: "price" },
  { header: "啟用狀態", accessor: "is_enabled" },
] as { header: string; accessor: keyof AdminProduct }[];

const AdminProducts: FC = () => {
  const [createOrEdit, setCreateOrEdit] = useState<CreateOrEditType>("create");
  const [targetData, setTargetData] = useState<AdminProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState({ id: "", title: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { category } = useParams();

  const isLoading = useAppSelector(selectAdminProductIsLoading);
  //* 根據 params 來決定要 selector 哪種資料
  const products = useAppSelector(categoryData(category as CATEGORY));

  //* 根據產品數量來決定頁數
  //todo 之後做好後端後需要實現分頁功能
  const pageCount = Math.ceil(products.length / 10);
  //* 根據目前哪一頁來決定來決定要顯示哪筆產品，10 筆資料一頁
  const productsInPage = products.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 10,
    currentPage * 10
  );

  //* 透過 api 取得切換頁面後的產品資料
  const onChangePage = (page: number) => setCurrentPage(page);

  const onClickIsNormalModalOpen = () => setIsModalOpen(!isModalOpen);

  const onClickToEditHandler = (product: AdminProduct) => {
    setCreateOrEdit("edit");
    setTargetData(product!);
    setIsModalOpen(!isModalOpen);
  };

  const onClickToCreateHandler = () => {
    setCreateOrEdit("create");
    setIsModalOpen(!isModalOpen);
  };

  //* 打開刪除 modal
  const onClickToDeleteProductHandler = (target: AdminProduct) => {
    setDeleteTarget({ id: target.id, title: target.title });
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  useEffect(() => {
    dispatch(fetchAdminProductAsync());
  }, []);

  return (
    <div className="admin-products">
      {isLoading && <Loading />}
      {isModalOpen && (
        <ProductModal
          createOrEdit={createOrEdit}
          targetData={targetData}
          closeAction={onClickIsNormalModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          dataType={DELETE_MODAL_TYPE.adminProduct}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={setIsDeleteModalOpen}
        />
      )}
      <h3 className="admin-products__title">
        產品列表-{category?.toUpperCase()}
      </h3>
      <div className="admin-products__actions">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
          onClick={onClickToCreateHandler}
        >
          建立新商品
        </Button>
      </div>
      <AdminTable
        data={productsInPage}
        columns={tableColumns}
        onClickToEditHandler={onClickToEditHandler}
        onClickToDeleteHandler={onClickToDeleteProductHandler}
      />
      <div className="admin-products__function">
        <Pagination
          onChangePage={onChangePage}
          pageCount={pageCount}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AdminProducts;
