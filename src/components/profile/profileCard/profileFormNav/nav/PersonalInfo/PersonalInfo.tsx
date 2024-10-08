import USERS_API from "@app/api/users";
import { UserProfileResponse } from "@app/api/users/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseCard } from "@app/components/common/BaseCard/BaseCard";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { EmailItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/EmailItem/EmailItem";
import { FirstNameItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/FirstNameItem/FirstNameItem";
import { PhoneItem } from "@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/PhoneItem/PhoneItem";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { UpdateUserProfileRequest } from "@app/models";
import { setUserProfile } from "@app/store/slices/appSlice";
import { fieldValidate } from "@app/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DatePicker, Form, message, Select, Tag } from "antd";
import _ from "lodash";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

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
function convertDateFormat(inputDate: string): string {
  if (!inputDate) {
    return "";
  }
  const datePart = inputDate.split("T")[0]; // Lấy phần YYYY-MM-DD
  const parts = datePart.split("-"); // Tách thành mảng [YYYY, MM, DD]
  // Trả về định dạng DD-MM-YYYY
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
export const PersonalInfo: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const userProfileState: UserProfileResponse = useSelector(
    (state: any) => state.app.userProfile.payload
  );

  console.log(userProfileState);

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

  const { isLoading: isLoadingUpdateProfile, mutate: updateProfile } =
    useMutation(USERS_API.UPDATE_PROFILE, {
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

  const userFormValues = useMemo(
    () =>
      userProfileState
        ? {
          fullName: userProfileState.fullName,
          email: userProfileState.email,
          phoneNumber: userProfileState.phoneNumber,
          birthday: convertDateFormat(userProfileState.birthday),
          gender: userProfileState.gender,
          // role: userProfileState.roleNames[0],
          role: userProfileState.roleNames.length > 0 ? userProfileState.roleNames[0] : "",
          isActive: userProfileState.isActive,
        }
        : initialPersonalInfoValues,
    [user]
  );

  const [form] = Form.useForm();

  const { t } = useTranslation();

  const onFinish = (values: any) => {
    const result: UpdateUserProfileRequest = _.omit(values, [
      "email",
      "role",
    ]) as UpdateUserProfileRequest;
    if (result.birthday) {
      result.birthday = convertDateFormat(result.birthday); // Convert to YYYY-MM-DD
    }
    updateProfile({
      ...result,
      accountPhoto: userProfileState.accountPhoto,
    });
  };

  return (
    <BaseCard>
      <BaseButtonsForm
        form={form}
        name="info"
        loading={isLoadingUpdateProfile}
        initialValues={userFormValues}
        isFieldsChanged={isFieldsChanged}
        onFinish={onFinish}
      >
        {contextHolder}

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
              {userFormValues.role === "ROLE_ADMIN" ? (
                <Tag color="red" style={{ fontSize: "17px", padding: "14px 18px" }} >Admin</Tag>
              ) : userFormValues.role === "ROLE_MANAGER" ? (
                <Tag color="blue" style={{ fontSize: "17px", padding: "14px 18px" }} >Manager</Tag>
              ) : (
                <Tag color="default" style={{ fontSize: "17px", padding: "14px 18px" }} >{userFormValues.role || 'No Role'}</Tag>
              )}
            </BaseButtonsForm.Item>
          </BaseCol>

          {/* <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item name="gender" label={"Gender"}>
              <BaseInput />
            </BaseButtonsForm.Item>
          </BaseCol> */}

          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item name="gender" label={"Gender"}>
              <Select placeholder="Select Gender">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
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

          <BaseCol span={24}>
            <BaseButton type="primary" block htmlType="submit">
              Update Profile
            </BaseButton>
          </BaseCol>
        </BaseRow>
      </BaseButtonsForm>
    </BaseCard>
  );
};
