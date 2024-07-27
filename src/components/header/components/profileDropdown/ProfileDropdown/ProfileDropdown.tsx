import React from "react";
import { ProfileOverlay } from "../ProfileOverlay/ProfileOverlay";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { useResponsive } from "@app/hooks/useResponsive";
import * as S from "./ProfileDropdown.styles";
import { BasePopover } from "@app/components/common/BasePopover/BasePopover";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseAvatar } from "@app/components/common/BaseAvatar/BaseAvatar";
import { UserProfileResponse } from "@app/api/users/type";
import { useSelector } from "react-redux";

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();

  const userProfileState: UserProfileResponse = useSelector(
    (state: any) => state.app.userProfile.payload
  );

  return userProfileState ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          <BaseAvatar
            src={userProfileState.accountPhoto}
            alt="User"
            shape="circle"
            size={40}
          />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            <span>{userProfileState.fullName}</span>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
