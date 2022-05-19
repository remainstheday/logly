import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/text/views";
// import { Button } from "@keystone-ui/button";
import { processCloudinaryFile } from "../utils/processCloudinaryFile";
import QRCodeSVG from "qrcode.react";

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: FileList) => {
    await Promise.resolve(processCloudinaryFile(file[0])).then(
      (cloudinaryFile) => {
        if (onChange)
          onChange({
            kind: "create",
            inner: {
              kind: "value",
              value: cloudinaryFile ? cloudinaryFile : "",
            },
          });
      }
    );
  };

  const handleDeleteFile = () => {
    if (onChange) {
      onChange({
        kind: "update",
        inner: { kind: "value", value: "" },
        initial: { kind: "value", value: "" },
      });
    }
  };

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {value.inner.kind === "value" && value.inner.value.length > 0 && (
        <>
          <figure style={{ width: "100%", margin: "1em 0" }}>
            <audio controls src={value.inner.value} className="w-full">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
        </>
      )}
      {onChange && (
        <>
          <QRCodeSVG value="https://reactjs.org/" />,
        </>
      )}
    </FieldContainer>
  );
};
