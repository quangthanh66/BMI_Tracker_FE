import React from "react";
import { NotificationsDropdown } from "../components/notificationsDropdown/NotificationsDropdown";
import { ProfileDropdown } from "../components/profileDropdown/ProfileDropdown/ProfileDropdown";
import { HeaderSearch } from "../components/HeaderSearch/HeaderSearch";
import { SettingsDropdown } from "../components/settingsDropdown/SettingsDropdown";
import { HeaderFullscreen } from "../components/HeaderFullscreen/HeaderFullscreen";
import * as S from "../Header.styles";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "@app/utils/router";

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  isTwoColumnsLayout,
}) => {
  const navigate = useNavigate();

  const leftSide = isTwoColumnsLayout ? (
    <S.SearchColumn xl={16} xxl={17}>
      <BaseRow justify="space-between">
        <BaseCol>
          <S.GHButton />
        </BaseCol>
      </BaseRow>
    </S.SearchColumn>
  ) : (
    <>
      <BaseCol>
        <S.GHButton />
      </BaseCol>
    </>
  );

  return (
    <BaseRow justify="space-between" align="middle">
      {leftSide}

      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <HeaderFullscreen />
              </BaseCol>

              <BaseCol>
                <NotificationsDropdown />
              </BaseCol>

              <BaseCol>
                <SettingsDropdown />
              </BaseCol>

              {/* <BaseCol className="flex items-center">
                <IoIosLogOut
                  className="w-[26px] h-[26px] cursor-pointer"
                  onClick={() => navigate(PAGE_ROUTES.AUTH.LOGIN)}
                />
              </BaseCol> */}
            </BaseRow>
          </BaseCol>

          <BaseCol>
            <ProfileDropdown />
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
