import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/json/views";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { Styles } from "./Styles";
import { Global } from "@emotion/react";
import { Button } from "@keystone-ui/button";
const saveSvgAsPng = require("save-svg-as-png");

const imageOptions = {
  scale: 5,
  encoderOptions: 1,
  backgroundColor: "white",
  width: 50,
  height: 50,
};

const truncateComment = (text: string) => {
  return text.length > 75 ? text.slice(0, 75 - 1) + "..." : text;
};

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const QRCodes = value ? JSON.parse(value) : [];
  const componentRef = React.useRef(null);
  console.log(field);
  const handleClick = (elementId: string) => {
    saveSvgAsPng.saveSvgAsPng(
      document.getElementById(elementId),
      "qrcodes.png",
      imageOptions
    );
  };

  return (
    <FieldContainer>
      <Global styles={Styles} />
      <div className="qr-codes-container">
        <h3>{field.label}</h3>
        <Button tone="active" onClick={() => window.location.reload()}>
          Generate
        </Button>

        <div className="qr-codes">
          {QRCodes.length <= 0 && <i>QR Codes require related experiences.</i>}
          {QRCodes &&
            QRCodes.length > 0 &&
            QRCodes.map(
              (qrcode: {
                url: string;
                experienceId: string;
                artifactId: string;
              }) => (
                <>
                  <div className="qr-code" key={qrcode.url}>
                    <div>
                      <QRCodeCanvas
                        id={qrcode.url}
                        key={qrcode.url}
                        size={150}
                        value={qrcode.url}
                      />
                    </div>
                    <div className="qr-actions">
                      <div className="qr-buttons">
                        <Button
                          tone="active"
                          style={{ marginLeft: 25 }}
                          onClick={() => handleClick(qrcode.url)}
                        >
                          Download
                        </Button>
                        {/*<Button*/}
                        {/*  tone="negative"*/}
                        {/*  style={{ marginLeft: 25 }}*/}
                        {/*  onClick={() => handleClick(qrcode.url)}*/}
                        {/*>*/}
                        {/*  Delete*/}
                        {/*</Button>*/}
                      </div>
                      <a href={qrcode.url}>{qrcode.url}</a>
                    </div>
                  </div>
                </>
              )
            )}
        </div>
      </div>

      <div className="print-qr-codes" ref={componentRef}>
        <h3>{field.label}</h3>
        <div className="qr-codes">
          {QRCodes &&
            QRCodes.length > 0 &&
            QRCodes.map(
              (qrcode: {
                url: string;
                experienceId: string;
                artifactId: string;
              }) => (
                <div className="qr-code" key={qrcode.url}>
                  <a href={qrcode.url}>{qrcode.url}</a>
                  <QRCode
                    key={qrcode.url}
                    size={200}
                    value={qrcode.url}
                    renderAs="svg"
                  />
                </div>
              )
            )}
        </div>
      </div>
    </FieldContainer>
  );
};
