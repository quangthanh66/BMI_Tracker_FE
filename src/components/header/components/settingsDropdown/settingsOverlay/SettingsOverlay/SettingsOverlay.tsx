import { DropdownCollapse } from "@app/components/header/Header.styles";
import { useAppDispatch, useAppSelector } from "@app/hooks/reduxHooks";
import { setNightMode } from "@app/store/slices/nightModeSlice";
import { setTheme } from "@app/store/slices/themeSlice";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NightModeSettings } from "../nightModeSettings/NightModeSettings";
import { ThemePicker } from "../ThemePicker/ThemePicker";
import * as S from "./SettingsOverlay.styles";

export const SettingsOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { isPWASupported, event } = useAppSelector((state) => state.pwa);

  useEffect(() => {
    dispatch(setTheme("light"));
    dispatch(setNightMode(false));
  }, []);

  return (
    <S.SettingsOverlayMenu {...props}>
      <DropdownCollapse
        bordered={false}
        expandIconPosition="end"
        ghost
        defaultActiveKey="themePicker"
      >
        {/*<DropdownCollapse.Panel header={t('header.changeLanguage')} key="languagePicker">
          <LanguagePicker />
        </DropdownCollapse.Panel> */}
        <DropdownCollapse.Panel
          header={t("header.changeTheme")}
          key="themePicker"
        >
          <ThemePicker />
        </DropdownCollapse.Panel>
        <DropdownCollapse.Panel
          header={t("header.nightMode.title")}
          key="nightMode"
        >
          <NightModeSettings />
        </DropdownCollapse.Panel>
      </DropdownCollapse>
      {isPWASupported && <S.PwaInstallWrapper></S.PwaInstallWrapper>}
    </S.SettingsOverlayMenu>
  );
};
