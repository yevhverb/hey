import React from 'react';
import { useForm } from 'react-hook-form';
import { UIInput, UIButton, UILogo } from '../../../components/UI';

type Props = {
  userEmoji: string;
  joinRoom: ({ userName }: { userName: string }) => void;
  leaveRoom: () => void;
};

export const RoomEnter: React.FC<Props> = ({
  userEmoji,
  leaveRoom,
  joinRoom,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="xl:w-1/3 lg:w-5/12 md:w-7/12 sm:w-2/3 w-full space-y-9">
      <div className="space-y-4">
        <UILogo className="w-24 h-24 mx-auto text-4.5xl" icon={userEmoji} />
        <h3 className="text-center text-4xl font-bold">
          Enter your name <br /> to join call room
        </h3>
      </div>
      <form
        className="w-full sm:px-16 px-9 rounded-xl space-y-4"
        onSubmit={handleSubmit(joinRoom)}
      >
        <UIInput
          className="w-full mb-5 border-gray-900 ring-gray-700 bg-gray-800 bg-opacity-75"
          name="userName"
          placeholder="Your name"
          register={register}
          autoFocus
        />
        <div className="flex sm:flex-row-reverse flex-col sm:flex-nowrap flex-wrap items-center">
          <UIButton
            className="w-full border-gray-900 ring-red-800 bg-red-800"
            type="submit"
            classIcon="fas fa-sign-in-alt"
          >
            Enter
          </UIButton>
          <UIButton
            className="w-full sm:mr-2 border-gray-900 ring-gray-700 bg-gray-800"
            classIcon="fas fa-arrow-left"
            onClick={leaveRoom}
          >
            Leave
          </UIButton>
        </div>
      </form>
    </div>
  );
};
