import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/json/views";
import QRCode from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { Styles } from "./Styles";
import { Global } from "@emotion/react";
import { Button } from "@keystone-ui/button";

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const QRCodes = value ? JSON.parse(value) : [];
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <FieldContainer>
      <Global styles={Styles} />
      <div className="qr-codes-container">
        <h3>{field.label}</h3>
        {QRCodes.length > 0 && (
          <Button tone="active" onClick={handlePrint}>
            Print
          </Button>
        )}

        <div className="qr-codes">
          {QRCodes.length <= 0 && (
            <i>
              QR Codes will automatically generate once there are related
              experiences.
            </i>
          )}
          {QRCodes &&
            QRCodes.length > 0 &&
            QRCodes.map(
              (qrcode: {
                url: string;
                experienceId: string;
                artifactId: string;
              }) => (
                <div className="qr-code" key={qrcode.url}>
                  <QRCode
                    key={qrcode.url}
                    size={80}
                    value={qrcode.url}
                    renderAs="svg"
                  />
                  <a href={qrcode.url}>{qrcode.url}</a>
                </div>
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
