import React from 'react';

type Props = {
  analyzerState?: { size: number };
};

export const RoomUserAnalyzer = ({ analyzerState }: Props) => {
  return (
    <div
      style={{
        width: analyzerState?.size || 0,
        height: analyzerState?.size || 0,
      }}
      className="rounded-full bg-gray-700 bg-opacity-25 transition duration-150"
    />
  );
};
