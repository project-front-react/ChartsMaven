import React from "react";
import Title from "../../../components/Title";
import "./teamLayout.scss";
import ImageContainer from "../../../components/ImageContainer";
import { BASE_URL } from "../../../utils/Constants";
const TeamLayout = (props) => {
  const { data } = props;
  return (
    <>
      {data !== undefined && (
        <div className="teams-section">
          <Title title={data?.heading} underline />
          <div
            className="content-description"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
          <div className="team-members">
            {data?.teams?.length > 0 &&
              data?.teams?.map((val, i) => (
                <ImageContainer
                  src={`${BASE_URL}${val?.team_image}`}
                  alt={`team-member-${i}`}
                  size="sm"
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TeamLayout;
