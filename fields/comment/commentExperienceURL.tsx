import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/text/views";

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  return (
    <>
      {value.inner.kind === "value" && value.inner.value.length > 0 && (
        <FieldContainer>
          <FieldLabel>{field.label}</FieldLabel>
          <p>{value.inner.value}</p>
        </FieldContainer>
      )}
    </>
  );
};
