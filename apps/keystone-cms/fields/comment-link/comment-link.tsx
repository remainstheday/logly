import { controller } from "@keystone-6/core/fields/types/json/views";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import React from "react";

export const Field = ({ field, value }: FieldProps<typeof controller>) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <a href={value}>{value}</a>
    </FieldContainer>
  );
};
