import React from "react";
import "./accordionStyle.scss";
import { useRef } from "react";
import { AppImages } from "../../appData/appImages";
const Accordion = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { question, uuid, answer } = faq;
  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${
            active === uuid ? "active" : ""
          }`}
          onClick={() => handleToggle(uuid)}
        >
          <h5 className="rc-accordion-title">{question}</h5>
          <i className="rc-accordion-icon">
            <img src={AppImages.FaqArrowIcon} alt="arrow-icon" id="imgPre"/>
          </i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse ${active === uuid ? "show" : ""}`}
        style={
          active === uuid
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="rc-accordion-body">
          <p className="mb-0" dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
