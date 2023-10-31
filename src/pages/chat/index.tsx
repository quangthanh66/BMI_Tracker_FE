import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { BiDotsVerticalRounded, BiPhoneCall } from 'react-icons/bi';
import { FAKE_CHATTING } from './constant';

const ChattingManagement = () => {
  return (
    <BaseRow>
      <BaseCol span={24} className="flex items-center justify-between w-full ">
        <BaseSpace size="middle">
          <BaseAvatar
            size={'large'}
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww"
          />
          <BaseSpace direction="vertical">
            <BaseTypography className="font-bold text-base">Kelvin Powell </BaseTypography>
            <BaseTypography>30 minutes ago</BaseTypography>
          </BaseSpace>
        </BaseSpace>

        <BaseSpace size="large">
          <BiPhoneCall size={30} className="cursor-pointer" />
          <BsFillCameraVideoFill size={30} className="cursor-pointer" />
          <BiDotsVerticalRounded size={30} className="cursor-pointer" />
        </BaseSpace>
      </BaseCol>

      <BaseCol span={24} className="min-h-[80vh] p-4 mt-2 rounded-md  bg-[#F5F7F8]">
        <div className="flex justify-center w-full ">
          <BaseTypography className="text-gray-500 text-sm">31-10-2023</BaseTypography>
        </div>

        <div className="flex flex-col items-center gap-2 w-full mt-4">
          {FAKE_CHATTING.map((chatting, index) => {
            const { message, time, type } = chatting;
            return (
              <div
                key={index}
                className={`flex items-center ${
                  type === 'sender' ? 'justify-start' : ' flex-row-reverse'
                } gap-2 w-[100%]`}
              >
                <BaseAvatar
                  size={'large'}
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww"
                />

                <div
                  className={`flex flex-col  p-4 rounded-md ${
                    type === 'sender' ? 'bg-[#EEEDED] items-start' : 'bg-[#00A9FF] items-end'
                  }`}
                >
                  <BaseTypography.Paragraph className={`${type === 'receiver' && 'text-white'}`}>
                    {message}
                  </BaseTypography.Paragraph>

                  <BaseTypography className={`${type === 'receiver' && 'text-white'} text-sm`}>{time}</BaseTypography>
                </div>
              </div>
            );
          })}
        </div>
      </BaseCol>
    </BaseRow>
  );
};

export default ChattingManagement;
