import React from "react";
import "./footer.scss";
import { Container } from "react-bootstrap";
import { BASE_URL } from "../../../utils/Constants";

const Footer = ({ footerLinksdata }) => {
  return (
    <footer className="web-footer">
      <Container>
        <div className="footerSection">
          <div className="socialDetail">
            <span className="titleBorder">
              {footerLinksdata?.socials?.heading}
            </span>
            <div className="imgdata">
              {footerLinksdata?.socials?.links.map((item, id) => {
                return (
                  <div key={id}>
                    <a href={item?.link} target="_blank">
                      <img src={BASE_URL + item.icon} alt="social-icon" id="imgPre" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {footerLinksdata?.quick_links.length > 0 &&
            footerLinksdata?.quick_links.map((item, index) => {
              return (
                <div className="socialDetail" key={index}>
                  <span className="titleBorder">{item.heading}</span>
                  {item.links.map((item, index) => {
                    return (
                      <div key={index}>
                        <ul className="footerDetail">
                          <li>
                            <a
                              target="blank"
                              href={`${window.location.origin === "https://testyourapp.online"
                                ? `${window.location.origin}/charts-maven-frontend/#${item?.link}`
                                : window.location.origin === "https://www.chartsmaven.com"
                                  ? `${window.location.origin}/indexcp.html#/${item?.link}`
                                  : `${window.location.origin}/#/${item?.link}`
                                }`}
                            >
                              {item?.title}
                            </a>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            })}

        </div>
        <div className="FooterCopySection">{footerLinksdata?.copyright}</div>
      </Container>
    </footer>
  );
};

export default Footer;
