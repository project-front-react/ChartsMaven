import React, { useRef, useState } from "react";
import { AppImages } from "../../../appData/appImages";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavbarItems } from "../../../appData/appData";
import "./navbar.scss";
import Button from "../../../components/Controls/Button/Button";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import searchIcon from "../../../assets/images/search.svg";
import Notification from "../../../components/Notification";
import SearchBar from "../../../components/SearchBar";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const [search, setSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log(isOpen, "isOpen");
  }, [isOpen])
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        if (isOpen) {
          setIsOpen(false);
        } else {
          setIsOpen(false);
        }

      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleToggle = () => {
    setShowMenu(!showMenu);
    toggleBodyClass("showMenu");
  };
  const [topHeader, setTopHeader] = useState(null);
  React.useEffect(() => {
    const topHeader = document.querySelector(".top-header");
    if (topHeader) {
      setTopHeader(topHeader.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    const className = "showMenu";
    if (document.body.classList.contains(className)) {
      toggleBodyClass(className);
    }
  }, [location]);

  const toggleBodyClass = (className) => {
    document.body.classList.toggle(className);
    if (document.body.classList.contains(className)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };
  let token = localStorage.getItem("token");
  const handleLogout = () => {
    window.localStorage.clear()
    navigate("/login");
  };

  const handelHide = () => {
    // notification && notification(false);
    search && search(false)
    if (isOpen === true) {
      setIsOpen(false)
    }
    // setSearch(false)
  };

  const handelChangeSearch = () => {
    setSearch(true);
    if (search === true) {
      setSearch(false);
    }
  };

  const handleNavigateToProfile = () => {
    // Then navigate to the desired location

    navigate("/profile");
    window.location.reload(); // Refresh the page
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      console.log("addif")
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen])
  console.log(isOpen, "isopen is")
  return (
    <header className="app-header" ref={navbarRef}>
      <div className="top-header">
        New: Get your subscription for your daily stock market updates{" "}
      </div>
      <nav className="navbar" onClick={handelHide}>
        <Container>
          <div className="logo" onClick={() => navigate("/")} role="button">
            <img src={AppImages.Logo} className="logo" alt="brand-logo" style={{ pointerEvents: "none" }} id="imgPre" />
          </div>
          <div className="notificationNavContainer">
            <div className="searchBarDataRes">
              {search && <SearchBar search={search} setSearch={setSearch} />}
              <div
                className="search-icon"
                onClick={handelChangeSearch}
                style={{ position: "relative" }}
              >
                <img src={searchIcon} alt="search-icon" className={`${search === true ? "imageHide" : ""}`} style={{ pointerEvents: "none" }} />
              </div>
            </div>
            {token &&
              <div className="notificationIconRes">
                <div
                  className="notify-icon"
                  onClick={handleClick}
                >
                  <img src={AppImages.notification} alt="notify-icon" id="imgPre" />
                </div>
                <div className={isOpen ? "popover__content" : "content_hide"}>
                  {/* <p className="popover__message">
                      Notification List Here
                    </p> */}
                  <Notification isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                {notification && <Notification />}
              </div>
            }
          </div>
          <div className="push-left">
            <button
              id="menu-toggler"
              data-class="showMenu"
              className="hamburger"
              onClick={handleToggle}
            >
              <span className="hamburger-line hamburger-line-top"></span>
              <span className="hamburger-line hamburger-line-middle"></span>
              <span className="hamburger-line hamburger-line-bottom"></span>
            </button>

            <ul
              id="primary-menu"
              className={`menu nav-menu ${showMenu ? "showMenu" : "hideMenu"}`}
            >
              {NavbarItems.length > 0 &&
                NavbarItems.map((val, i) => (
                  <li
                    key={i}
                    className={`menu-item ${location.pathname === val.url ? "menu-active" : ""
                      }`}
                    id={`${search === true ? "pushLeftNone" : ""}`}
                  >
                    <Link to={val.url} className="nav__link">
                      {val.name}
                    </Link>
                  </li>
                ))}
              {token ? (
                <li className="login-btn" id={`${search === true ? "pushLeftNone" : ""}`}>
                  <Button text="Logout" onClick={handleLogout} />
                </li>
              ) : (
                <li className="login-btn" id={`${search === true ? "pushLeftNone" : ""}`}>
                  <Button text="Login" onClick={() => navigate("/login")} />
                </li>
              )}
              <li className="icons-list" >
                <div className="searchBarData">
                  {search && (
                    <SearchBar search={search} setSearch={setSearch} />
                  )}
                  <div className="search-icon" onClick={handelChangeSearch} >
                    <img src={AppImages.search} alt="search-icon" className={`${search === true ? "imageHide" : ""}`} id="imgPre" />
                  </div>
                </div>
                {token &&
                  <div className="notificationIcon">
                    <div
                      className="notify-icon"
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={AppImages.notification} alt="notify-icon" id="imgPre" />
                    </div>
                    <div className={isOpen ? "popover__content" : "content_hide"}>
                      {/* <p className="popover__message">
                      Notification List Here
                    </p> */}
                      <Notification isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                    {/* {notification && <Notification />} */}
                  </div>
                }
                {token && (
                  <div
                    className="profile-icon icon"
                    onClick={
                      handleNavigateToProfile
                    }
                  >
                    <img src={AppImages.user} alt="profile-icon" id="imgPre" />
                  </div>
                )}
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
