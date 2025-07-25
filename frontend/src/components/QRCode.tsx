import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
}

const QRCode = ({ value, size = 128 }: QRCodeProps) => {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={true}
    />
  );
};

export default QRCode;