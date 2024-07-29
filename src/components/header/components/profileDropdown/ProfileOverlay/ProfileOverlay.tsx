import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as S from "./ProfileOverlay.styles";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@app/store/slices/appSlice";
import { PAGE_ROUTES } from "@app/utils/router";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";

export const ProfileOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutAccount = () => {
    localStorage.clear();
    dispatch(setUserProfile(undefined));
    navigate(PAGE_ROUTES.AUTH.LOGIN);
  };

  return (
    <div {...props} className="flex flex-col gap-y-2 min-w-[100px]">
      <BaseButton onClick={() => navigate("/profile")}>
        {t("profile.title")}
      </BaseButton>
      <S.ItemsDivider />

      <BaseButton type="primary" onClick={onLogoutAccount}>
        {t("header.logout")}
      </BaseButton>
    </div>
  );
};
