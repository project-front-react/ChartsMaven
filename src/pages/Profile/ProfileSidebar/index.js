import React, { useRef, useState } from 'react';
import "./ProfileSidebar.scss";
import { ProfileTabs } from '../../../appData/appData';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({activeItem,handleItemClick,handleLogout}) => {
    const [showMenu, setShowMenu] = useState(false);
  // const [editProfile, setEditProfile] = useState(false);
  // const [activeItem, setActiveItem] = useState("SubscriptionHistory");
  const navigate = useNavigate()
  // const scrollRef = useRef(null)

    const toggleBodyClass = (className) => {
        document.body.classList.toggle(className);
        if (document.body.classList.contains(className)) {
            // document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };
    const handleToggle = () => {
        setShowMenu(!showMenu);
        toggleBodyClass("showMenu");
    };
    const scrollToBottom = () => {
      window.scrollTo(0, 350);
    };

    // const handleLogout = (item) => {
    //   console.log(item, "item name");
    //   if (item == "Logout") {
    //     window.localStorage.clear()
  
    //     navigate("/login");
    //     // localStorage.clear();
    //     // toast.success("Logged out successfullyss");
    //   }
    // };

    // function handleItemClick(component) {
    //   setEditProfile(false);
    //   setActiveItem(component);
    // }
    // showMenu()
    console.log(showMenu,"showmenukjj");
    return (
        <div className='containerData'>
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
              {ProfileTabs.length > 0 &&
                  ProfileTabs.map((item, i) => (
                    <li
                      className={`nav-items ${activeItem === item.component ? "activeItem" : ""
                        }`}
                      key={i}
                      onClick={() => {
                        handleItemClick(
                          item.component == null
                            ? navigate(item.action)
                            : item.component
                        );
                        handleLogout(item.name);
                      //  setShowMenu(false)
                      handleToggle()
                      scrollToBottom()
                      }}
                      // onClick={()=>{
                      //   handleLogout();
                      //   handleItemClick();
                      // }}
                    >
                      <span className="icon">{item.icon}</span> {item.name}
                    </li>
                  ))}
            </ul>
        </div>
    )
}

export default ProfileSidebar