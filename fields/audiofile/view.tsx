import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/text/views";
import { Fragment, useState } from "react";

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
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

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>

      {onChange && (
        <Fragment>
          <input
            type="file"
            onChange={(event) => processFileUpload(event.target.files![0])}
          />
        </Fragment>
      )}
    </FieldContainer>
  );
};
