import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/text/views";

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  console.log(value);
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {value.inner.kind === "value" && value.inner.value.length > 0 && (
        <>
          <img width="690" src={value.inner.value} alt="comment image" />
        </>
      )}
    </FieldContainer>
  );
};
