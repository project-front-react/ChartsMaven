import React from "react";
import CustomButton from "../../../components/Controls/Buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppImages } from "../../../appData/appImages";
import { BASE_URL } from "../../../utils/Constants";

//category listing main
const CategoryBox = ({ subCategoryData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subCategoryLists = useSelector(
    (state) => state?.categoryListData?.categoryList?.data?.sub_categories
  );
  const handleNavigate = (id, categoryName) => {
    if (!id) {
      return;
    }
    // dispatch(getCategoryWiseArticle(id));
    navigate(`/categorywiselisting/${id}`, {
      state: {
        subCategoryLists: subCategoryLists,
        subcategoryname: categoryName,
      },
    });
  };
  const onImageError = (e) => {
    e.target.src = AppImages.PlaceHolderImage;
  };
  return (
    <div className="categoryBox-item">
      <div className="icon-wrapper">
        <img
          src={
            subCategoryData?.sub_category_image
              ? `${BASE_URL}${subCategoryData?.sub_category_image}`
              : AppImages.PlaceHolderImage
          }
          alt={`category-icon`}
          onError={onImageError}
          id="imgPre"
        />
      </div>
      <div className="title">
        <h5>{subCategoryData?.sub_category_name}</h5>
      </div>
      <div className="article-button-wrapper">
        <CustomButton
          onClick={() =>
            handleNavigate(
              subCategoryData.uuid,
              subCategoryData?.sub_category_name
            )
          }
          text="Read Articles"
          bg="#EA0A3B"
          textColor="#ffffff"
          shadow="0px 10px 10px rgba(0, 0, 0, 0.1)"
        />
      </div>
    </div>
  );
};

export default CategoryBox;
