import React from 'react';
import cx from 'classnames';
import { UserState } from '../../store/user';
import {
  UILogo,
  UIPaper,
  UIIconToggle,
  UIAudioStream,
} from '../../components/UI';
import { withStreamAnalyzer } from './withStreamAnalyzer';
import { RoomUserItem, RoomUserAction, RoomUserAnalyzer } from './components';

interface Props extends UserState {
  userStream: MediaStream | null;
  analyzerState?: { size: number };
  withMuted?: boolean;
}

export const RoomUser: React.FC<Props> = withStreamAnalyzer(
  ({
    userName,
    userEmoji,
    userStream,
    userPermits,
    analyzerState,
    withMuted = true,
  }) => {
    const [audioState, setAudioState] = React.useState({ muted: !withMuted });

    const toggleMutedUser = () => {
      setAudioState((s) => ({ ...s, muted: !s.muted }));
    };

    return (
      <div className="2xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full h-64 p-2">
        <UIPaper
          className={cx(
            'relative flex items-center justify-center h-full px-2 py-3.5 border-6 border-gray-900 overflow-hidden ring-0 transition duration-150',
            {
              'ring-3 ring-green-500': Number(analyzerState?.size) > 100,
            }
          )}
        >
          <div className="absolute top-2 right-2 flex space-x-2">
            {withMuted && (
              <RoomUserAction onClick={toggleMutedUser}>
                <UIIconToggle
                  state={!audioState.muted}
                  onClass="fas fa-volume-up"
                  offClass="fas fa-volume-mute text-lg text-red-600"
                />
              </RoomUserAction>
            )}
          </div>
          <UILogo
            className="absolute top-50 left-50 w-32 h-32 text-6xl"
            icon={userEmoji}
          />
          <RoomUserAnalyzer analyzerState={analyzerState} />
          <div className="absolute bottom-1.5 left-2 flex space-x-2">
            <RoomUserItem>
              <UIIconToggle
                state={userPermits.audio}
                onClass="fas fa-microphone"
                offClass="fas fa-microphone-slash text-red-600"
              />
            </RoomUserItem>
            <RoomUserItem className="px-3">
              {userName || 'Someone'}
            </RoomUserItem>
          </div>
        </UIPaper>
        {userStream && (
          <UIAudioStream userStream={userStream} audioState={audioState} />
        )}
      </div>
    );
  }
);
