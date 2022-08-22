import React from "react";
import { DocumentRenderer } from "@keystone-6/document-renderer";

export default function DescriptionContent({ content }) {
  if (!content) return <></>;
  return (
    <div className="my-8 wysiwyg-editor">
      <DocumentRenderer document={content} />
    </div>
  );
}
