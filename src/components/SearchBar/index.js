import React, { useEffect, useState } from "react";
import Input from "../FormControls/Input";
import "./SearchBar.scss";
import { AppImages } from "../../appData/appImages";
import makeRequest from "../../utils/ApiHandler";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const [Open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [inputChange, setInputChange] = useState("");
  const navigate = useNavigate();
  const handelChange = (e) => {
    setInputChange(e.target.value);
  };
  console.log(inputChange , "inputdata")

  useEffect(() => {
  if (searchData.length > 0){
    setOpen(true)
  }
   else {
    setOpen(false)
  } 

  }, [inputChange])
  

  const SearchAPI = async () => {
    try {
      const response = await makeRequest(
        "get",
        `/cms/global-search/?search_tag=article&search=${inputChange}`
      );
      if (response.status === 200) {
        setSearchData(response?.data?.data);
      }
    } catch (e) {
    }
  };

  const handelClose = () =>{
    props.setSearch(false)
  }

  useEffect(() => {
    inputChange !== '' &&
      SearchAPI();
  }, [inputChange]);

  return (
    <>
      <div className="searchBoxData">
        <div className="search-box">
          <div className="imagewrapper">
            <img src={AppImages.search} id="imgPre"/>
          </div>
          <input className="search-txt"
            type="text"
            name="search"
            placeholder="Type to Search"
            onChange={handelChange}
            value={inputChange}
            />
          <div className="imagewrapper" id="imagewrapper" onClick={handelClose}>
            <img src={AppImages.closeBlue} id="imgPre"/>
          </div>
          {inputChange.length>0 &&   searchData.length > 0 && (
            <div className="SuggetionBox">
              {searchData.length > 0 &&
                searchData?.map((item, index) => {
                  return (
                    <div
                      className="data"
                      role="button"
                      onClick={() => {
                        navigate(`/categorydetail/${item?.uuid}`);
                      }}
                    >
                      <div className="imagewrapperData">
                        <img src={AppImages.search} alt="search" id="imgPre"/>
                      </div>
                      <p>{item?.title}</p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
