import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/json/views";
import QRCode from "qrcode.react";
import { useReactToPrint } from "react-to-print";

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const QRCodes = JSON.parse(value);
  return (
    <FieldContainer ref={componentRef}>
      <FieldLabel>{field.label}</FieldLabel>
      {QRCodes &&
        QRCodes.length > 0 &&
        QRCodes.map((url: string) => (
          <>
            <QRCode
              key={url}
              value={url}
              renderAs="svg"
              style={{ margin: "10px" }}
            />
            <a>{url}</a>
          </>
        ))}

      <button onClick={handlePrint}>Print this out!</button>
    </FieldContainer>
  );
};
