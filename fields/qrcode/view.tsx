import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/json/views";
import QRCode from "qrcode.react";
// import { useReactToPrint } from "react-to-print"; todo: make qrcodes printer friendly

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const QRCodes = value ? JSON.parse(value) : [];
  const componentRef = React.useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <FieldContainer ref={componentRef}>
      <FieldLabel>{field.label}</FieldLabel>
      {QRCodes &&
        QRCodes.length > 0 &&
        QRCodes.map((url: string) => (
          <div key={url}>
            <QRCode
              key={url}
              value={url}
              renderAs="svg"
              style={{ margin: "10px" }}
            />
            <a href={url}>page link</a>
          </div>
        ))}

      {/*<button onClick={handlePrint}>Print this out!</button>*/}
    </FieldContainer>
  );
};