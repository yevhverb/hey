import React from 'react';
import { UIPaper, UILoader } from '../../components/UI';

type Props = {
  userStream: MediaStream | null;
};

export const withStreamAnalyzer = <T extends Props>(
  Component: React.ComponentType<T>
) => (props: T) => {
  let requestId: number;
  let audioContext: AudioContext;

  const { userStream } = props;
  const [analyzerState, setAnalyzerState] = React.useState({ size: 0 });

  React.useEffect(() => {
    if (userStream && !audioContext) {
      audioContext = new AudioContext();
      const analyzer = audioContext.createAnalyser();
      audioContext.createMediaStreamSource(userStream).connect(analyzer);

      const updateAnalyzerState = () => {
        requestId = window.requestAnimationFrame(updateAnalyzerState);
        const array = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(array);
        setAnalyzerState((s) => ({ ...s, size: array[15] }));
      };

      updateAnalyzerState();

      return () => {
        window.cancelAnimationFrame(requestId);
        audioContext.close();
      };
    }
  }, [userStream]);

  if (!userStream) {
    return (
      <div className="2xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full h-64 p-2">
        <UIPaper className="relative flex items-center justify-center h-full px-2 py-3.5 border-6 border-gray-900 overflow-hidden">
          <UILoader classNameItem="w-16 h-16 bg-gray-700" />
        </UIPaper>
      </div>
    );
  }

  return <Component analyzerState={analyzerState} {...props} />;
};
