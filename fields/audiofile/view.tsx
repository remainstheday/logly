import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/text/views";
import { Fragment } from "react";
import { Button } from "@keystone-ui/button";

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const processFileUpload = (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/djfxpvrca/auto/upload`; // TODO: refactor this to use .env
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response.secure_url);
        if (onChange)
          onChange({
            kind: "create",
            inner: { kind: "value", value: response.secure_url },
          });
        return response.secure_url;
      }
    };
    fd.append("upload_preset", "ekqp8s1g");
    fd.append("file", file);
    xhr.send(fd);
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
      {value.inner.value.length > 0 && (
        <>
          <figure style={{ width: "100%", margin: "1em 0" }}>
            <audio controls src={value.inner?.value} className="w-full">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
        </>
      )}
      {onChange && (
        <Fragment>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={(event) => processFileUpload(event.target.files![0])}
          />
          <Button
            tone="active"
            onClick={() => hiddenFileInput.current!.click()}
          >
            New File
          </Button>
          <Button
            style={{ marginLeft: "1em" }}
            tone="negative"
            onClick={handleDeleteFile}
          >
            Remove
          </Button>
        </Fragment>
      )}
    </FieldContainer>
  );
};
