import React from "react";
import "./Title.scss";
export default function Title(props) {
  const { title, subTitle, underline, abouttitle } = props;
  return (
    <div className="sectionTitle-container">
      {abouttitle && <div className={`section-title ${underline ? "text-underline" : ""} aboutTitle`} dangerouslySetInnerHTML={{ __html: abouttitle.lenght < 10 ? abouttitle.slice(0, 7) + "..." : abouttitle }}></div>}
      <h2 className={`section-title ${underline ? "text-underline" : ""}`}>
        {title}
      </h2>
      {subTitle && <p className="subtitle">{subTitle} </p>}
    </div>
  );
}
