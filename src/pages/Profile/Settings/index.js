import React from "react";
import "./settings.scss";
import { useState } from "react";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PutSettingAction,
  getSettingsAction,
} from "../../../redux/Slices/SettingsSlice/settingsSlice";
import CustomButton from "../../../components/Controls/Buttons";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import makeRequest from "../../../utils/ApiHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const getSettingsData = useSelector(
    (state) => state?.settingsData?.SettingsStatus?.data
  );
  const [checked, setChecked] = useState();
  const [Promotion, setPromotion] = useState();
  const [isNotification, setIsNotification] = useState();
  const [ConfirmModalState, setConfirmModal] = useState(false);
  useEffect(() => {
    setChecked(getSettingsData?.download_over_wifi);
    setPromotion(getSettingsData?.promotions);
    setIsNotification(getSettingsData?.allow_notifications);
  }, [getSettingsData]);

  const handleToggleChangeDownload = (e) => {
    setChecked(!checked);
    let data = {
      download_over_wifi: e.target.checked,
    };
    dispatch(PutSettingAction(data));
  };

  const handleToggleChangePromotions = (e) => {
    setPromotion(!Promotion);
    let data = {
      promotions: e.target.checked,
    };
    dispatch(PutSettingAction(data));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSettingsAction());
  }, []);

  const handleModalClose = () => {
    setConfirmModal(false);
  };
  const getConfirmationDeleteAccount = async (confirm) => {
    if (confirm === "true") {
      const response = await makeRequest("delete", `/user/delete-account/`);
      if (response?.status === 200) {
        setConfirmModal(false);
        navigate("/login");
        toast.success(response?.data?.data);
        localStorage.clear();
      } else {
        setConfirmModal(false);
        toast.error("Something went wrong!");
      }
      return response;
    }
  };

  const handleNotification = (e) => {
    setIsNotification(!isNotification);
    let data = {
      allow_notifications: e.target.checked,
    };
    dispatch(PutSettingAction(data));
  };
  return (
    <div className="settings-panel">
      <ConfirmModal
        title="Delete Account"
        subTitle="Are you sure You want to Delete account Permanently?"
        showModal={ConfirmModalState}
        handleModalClose={handleModalClose}
        getConfirmationDeleteAccount={getConfirmationDeleteAccount}
      // handleModalClose={handleModalClose}
      />
      <h5>Settings</h5>
      <div className="settings">
        <div className="setting-item">
          <div className="setting-name">Download Over WiFi Only</div>
          <div className="setting">
            <ToggleSwitch
              checked={checked}
              onChange={(e) => handleToggleChangeDownload(e)}
            />
          </div>
        </div>
        {getSettingsData?.has_subscribed === true && (
          <div className="setting-item">
            <div className="setting-name">
              Promotions
              <div className="settingText">Only Subscribed User</div>
            </div>
            <div className="setting">
              <ToggleSwitch
                checked={Promotion}
                onChange={(e) => handleToggleChangePromotions(e)}
              />
            </div>
          </div>
        )}
        <div className="setting-item">
          <div className="setting-name">Notifications</div>
          <div className="setting">
            <ToggleSwitch
              checked={isNotification}
              onChange={(e) => handleNotification(e)}
            />
          </div>
        </div>
        <div
          className="save-wrapper"
          onClick={() => {
            setConfirmModal(true);
          }}
        >
          <CustomButton text="Delete Account" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
