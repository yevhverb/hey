const emoji = ['🐨', '🐯', '🦁', '🐗', '🦝'];

export const getRandomEmoji = () => {
  return emoji[Math.floor(Math.random() * Math.floor(emoji.length))];
};

export const toClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getMediaStream = () => {
  return navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then((stream) => stream)
    .catch((error) => error);
};
