import QRCode from "qrcode.react";

const QrCodeGenerator = ({ codigo }) => {
  return <QRCode value={codigo} />;
};

export default QrCodeGenerator;
