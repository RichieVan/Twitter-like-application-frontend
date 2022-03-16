const cutImageAndGenerateUrl = ({
  image,
  sWidth,
  sHeight,
  dx,
  dy,
  dWidth,
  dHeight,
}) => {
  const outputImage = document.createElement('canvas');

  outputImage.width = dWidth;
  outputImage.height = dHeight;

  const ctx = outputImage.getContext('2d');
  ctx.drawImage(
    image,
    dx,
    dy,
    sWidth,
    sHeight,
  );

  const dataURL = outputImage.toDataURL('image/png');
  return dataURL;
};

export default cutImageAndGenerateUrl;
