import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { BaseCard } from "@app/components/common/BaseCard/BaseCard";
import { FirstNameItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/FirstNameItem/FirstNameItem";
import { LastNameItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/LastNameItem/LastNameItem";
import { NicknameItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/NicknameItem/NicknameItem";
import { SexItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/SexItem/SexItem";
import { BirthdayItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/BirthdayItem/BirthdayItem";
import { LanguageItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/LanguageItem/LanguageItem";
import { PhoneItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/PhoneItem/PhoneItem";
import { EmailItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/EmailItem/EmailItem";
import { CountriesItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/CountriesItem/CountriesItem";
import { CitiesItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/CitiesItem/CitiesItem";
import { ZipcodeItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/ZipcodeItem/ZipcodeItem";
import { AddressItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/AddressItem/AddressItem";
import { WebsiteItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/WebsiteItem/WebsiteItem";
import { SocialLinksItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/SocialLinksItem/SocialLinksItem";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { Dates } from "@app/constants/Dates";
import { notificationController } from "@app/controllers/notificationController";
import { PaymentCard } from "@app/interfaces/interfaces";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { UserProfileResponse } from "@app/api/users/type";
import { useSelector } from "react-redux";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { Select, Tag } from "antd";

interface PersonalInfoFormValues {
  birthday?: string;
  country?: string;
  website: string;
  city?: string;
  address2: string;
  nickName: string;
  address1: string;
  sex?: string;
  facebook: string;
  language?: string;
  linkedin: string;
  zipcode: string;
  twitter: string;
  phone: string;
  email: string;
  fullName: string;

  role: string;
  isActive: boolean;
}
const { Option } = Select;
const initialPersonalInfoValues: PersonalInfoFormValues = {
  fullName: "",
  nickName: "",
  sex: undefined,
  birthday: undefined,
  language: undefined,
  phone: "",
  email: "",
  country: undefined,
  city: undefined,
  address1: "",
  address2: "",
  zipcode: "",
  website: "",
  twitter: "",
  linkedin: "",
  facebook: "",

  role: "",
  isActive: false,
};

export const PersonalInfo: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const userProfileState: UserProfileResponse = useSelector(
    (state: any) => state.app.userProfile.payload
  );

  const userFormValues = useMemo(
    () =>
      userProfileState
        ? {
          fullName: userProfileState.fullName,
          email: userProfileState.email,
          phone: userProfileState.phoneNumber,
          role: userProfileState.roleNames[0],
          birthday: userProfileState.birthday,
          gender: userProfileState.gender,
          isActive: userProfileState.isActive,
        }
        : initialPersonalInfoValues,
    [user]
  );

  const [form] = BaseButtonsForm.useForm();

  const { t } = useTranslation();

  const onFinish = useCallback(
    (values: PaymentCard) => {
      // todo dispatch an action here
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFieldsChanged(false);
        notificationController.success({ message: t("common.success") });
        console.log(values);
      }, 1000);
    },
    [t]
  );


  return (
    <BaseCard>
      <BaseButtonsForm
        form={form}
        name="info"
        loading={isLoading}
        initialValues={userFormValues}
        isFieldsChanged={isFieldsChanged}
        setFieldsChanged={setFieldsChanged}
        onFieldsChange={() => setFieldsChanged(true)}
        onFinish={onFinish}
      >
        <BaseRow gutter={{ xs: 10, md: 15, xl: 30 }}>
          <BaseCol span={24}>
            <BaseButtonsForm.Item>
              <BaseButtonsForm.Title>
                {t("profile.nav.personalInfo.title")}
              </BaseButtonsForm.Title>
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <FirstNameItem />
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item name="role" label={"Role"}>
              {form.getFieldValue('role') === 'ROLE_ADMIN' ? (
                <Tag color="green" style={{ fontSize: '17px', padding: '14px 18px' }}>Admin</Tag>
              ) : form.getFieldValue('role') === 'ROLE_MANAGER' ? (
                <Tag color="blue" style={{ fontSize: '17px', padding: '14px 18px' }}>Manager</Tag>
              ) : (
                <Tag color="default" style={{ fontSize: '16px', padding: '8px 16px' }}>No role selected</Tag>
              )}
            </BaseButtonsForm.Item>
          </BaseCol>


          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item name="gender" label={"Gender"}>
              <BaseInput />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item name="birthday" label={"Birthday"}>
              <BaseInput />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseButtonsForm.Item>
              <BaseButtonsForm.Title>
                {t("profile.nav.personalInfo.contactInfo")}
              </BaseButtonsForm.Title>
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <PhoneItem verified={user?.phone.verified} />
          </BaseCol>
          <BaseCol xs={24} md={12}>
            <EmailItem verified={user?.email.verified} />
          </BaseCol>
        </BaseRow>
      </BaseButtonsForm>
    </BaseCard>
  );
};
