import React from 'react';

type Props = {
  userStream: MediaStream;
  audioState: {
    muted: boolean;
  };
};

export const UIAudioStream: React.FC<Props> = React.memo(
  ({ userStream, audioState }) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);

    React.useLayoutEffect(() => {
      if (audioRef.current && !audioRef.current?.srcObject) {
        audioRef.current.srcObject = userStream;
        audioRef.current.play();
      }
    }, [audioRef, userStream]);

    React.useLayoutEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = audioState.muted ? 0 : 1;
      }
    }, [audioState.muted]);

    return <audio ref={audioRef} />;
  }
);
