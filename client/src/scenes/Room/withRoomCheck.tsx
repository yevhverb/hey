import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { roomActions, roomSelectors } from '../../store/room';
import { userSelectors } from '../../store/user';
import { UIContainer } from '../../components/UI';
import { RoomMessage } from './components';

export const withRoomCheck = <T extends {}>(
  Component: React.ComponentType<T>
) => (props: T) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useSelector(userSelectors.user);
  const { roomStatus, roomChecked } = useSelector(roomSelectors.room);
  const { roomId } = useParams<{ roomId: string }>();

  React.useEffect(() => {
    userId && !roomStatus && dispatch(roomActions.checkRoom({ roomId }));
  }, [userId, roomStatus]);

  React.useEffect(
    () => () => {
      dispatch(roomActions.updateRoom(null));
    },
    []
  );

  const toStart = () => history.push('/');

  return (
    <UIContainer className="relative min-h-screen flex flex-col items-center justify-center">
      {!roomChecked && <RoomMessage loader>Loading...</RoomMessage>}
      {roomChecked && roomStatus && <Component {...props} />}
      {roomChecked && !roomStatus && (
        <RoomMessage icon="😕" toStart={toStart}>
          Call room not found <br /> or closed by host!
        </RoomMessage>
      )}
    </UIContainer>
  );
};
