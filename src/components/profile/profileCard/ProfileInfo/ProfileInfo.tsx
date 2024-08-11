import USERS_API from "@app/api/users";
import { UserProfileResponse } from "@app/api/users/type";
import { BaseAvatar } from "@app/components/common/BaseAvatar/BaseAvatar";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { UserModel } from "@app/domain/UserModel";
import { imageDb } from "@app/services/firebase/config";
import { setUserProfile } from "@app/store/slices/appSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import * as S from "./ProfileInfo.styles";

interface ProfileInfoProps {
  profileData: UserModel | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const avatarRef = useRef<HTMLInputElement>();
  const userProfileState: UserProfileResponse = useSelector(
    (state: any) => state.app.userProfile.payload
  );
  const [messageApi, contextHolder] = message.useMessage();
  const { refetch: getUserProfile } = useQuery(
    ["get-user-profile"],
    USERS_API.GET_PROFILE,
    {
      enabled: false,
      onSuccess: (response: any) => {
        dispatch(setUserProfile(response));
      },
    }
  );
  const [imageUpload, setImageUpload] = useState("");

  const { mutate: updateProfile } = useMutation(USERS_API.UPDATE_PROFILE, {
    onError: () =>
      messageApi.open({
        type: "error",
        content: "Update profile is failed",
      }),
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Update profile is success",
      });
      getUserProfile();
    },
  });

  const dispatch = useDispatch();

  const uploadImageFromFirebase = (
    event: ChangeEvent<HTMLInputElement>
  ): string | undefined => {
    const files = event.target.files;

    if (!files || !files[0]) return "";

    const imageRef = ref(imageDb, `images/${files[0].name + v4()}`);
    uploadBytes(imageRef, files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => setImageUpload(url));
    });
  };

  useEffect(() => {
    if (imageUpload) {
      updateProfile({
        ...userProfileState,
        accountPhoto: imageUpload,
      });
    }
  }, [imageUpload]);

  return userProfileState ? (
    <S.Wrapper>
      {contextHolder}
      <S.ImgWrapper>
        <BaseAvatar
          shape="circle"
          src={userProfileState?.accountPhoto}
          alt="Profile"
        />
      </S.ImgWrapper>
      <S.Title>{userProfileState.fullName}</S.Title>
      <S.Subtitle>{userProfileState?.email}</S.Subtitle>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="avatar"
        ref={avatarRef as any}
        onChange={uploadImageFromFirebase}
      />
      <BaseButton
        block
        type="primary"
        onClick={() => avatarRef.current?.click()}
      >
        Upload Avatar
      </BaseButton>
    </S.Wrapper>
  ) : null;
};
