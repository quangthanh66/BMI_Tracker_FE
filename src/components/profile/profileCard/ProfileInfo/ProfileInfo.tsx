import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserModel } from "@app/domain/UserModel";
import * as S from "./ProfileInfo.styles";
import { BaseAvatar } from "@app/components/common/BaseAvatar/BaseAvatar";
import { UserItemTypes, UserProfileResponse } from "@app/api/users/type";
import { useSelector } from "react-redux";

interface ProfileInfoProps {
  profileData: UserModel | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const [fullness] = useState(90);
  const { t } = useTranslation();

  const userProfileState: UserProfileResponse = useSelector(
    (state: any) => state.app.userProfile.payload
  );

  return userProfileState ? (
    <S.Wrapper>
      <S.ImgWrapper>
        <BaseAvatar
          shape="circle"
          src={userProfileState?.accountPhoto}
          alt="Profile"
        />
      </S.ImgWrapper>
      <S.Title>{userProfileState.fullName}</S.Title>
      <S.Subtitle>{userProfileState?.email}</S.Subtitle>
      <S.FullnessWrapper>
        <S.FullnessLine width={fullness}>{fullness}%</S.FullnessLine>
      </S.FullnessWrapper>
      <S.Text>{t("profile.fullness")}</S.Text>
    </S.Wrapper>
  ) : null;
};
