import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
import { userSelectors } from '../../store/user';
import { roomActions } from '../../store/room';
import { UIContainer, UILogo, UIButton } from '../../components/UI';

export const Start = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useSelector(userSelectors.user);

  const handleCreateCallRoom = () => {
    const roomId = shortid.generate();
    dispatch(
      roomActions.createRoom({
        roomId,
        userId,
      })
    );
    history.push(`/${roomId}`);
  };

  return (
    <UIContainer className="flex items-center justify-center min-h-screen">
      <div className="xl:w-6/12 md:w-8/12 text-center space-y-12">
        <div className="space-y-6">
          <UILogo icon="👋" className="w-32 h-32 mx-auto text-6xl" />
          <p className="sm:text-5xl text-4xl font-extrabold">
            Create call room in a click and invite someone...
          </p>
        </div>
        <UIButton
          className="mx-auto border-gray-900 text-lg ring-gray-700 bg-gray-800"
          onClick={handleCreateCallRoom}
        >
          Create call room
        </UIButton>
      </div>
    </UIContainer>
  );
};
