import React from "react";
import { UserModel } from "@app/domain/UserModel";
import * as S from "./ProfileInfo.styles";
import { BaseAvatar } from "@app/components/common/BaseAvatar/BaseAvatar";
import { UserProfileResponse } from "@app/api/users/type";
import { useSelector } from "react-redux";

interface ProfileInfoProps {
  profileData: UserModel | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
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
    </S.Wrapper>
  ) : null;
};
