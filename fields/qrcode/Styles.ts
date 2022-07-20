import { css } from "@emotion/react";

export const Styles = css`
  .qr-codes-container h3 {
    display: inline;
    margin-right: 1rem;
    margin-top: 2rem;
  }

  .qr-codes-container .qr-codes {
    display: flex;
    flex-direction: column;
  }

  .qr-codes-container .qr-code {
    display: flex;
    margin: 1em 0;
    border: 1px solid #e1e5e9;
    padding: 0.5em;
    justify-content: space-between;
    background: #fafbfc;
  }

  .qr-codes .qr-actions {
    width: 70%;
  }

  .qr-codes .qr-actions a {
    display: block;
  }

  .qr-codes .qr-actions .qr-buttons {
    text-align: right;
    margin-bottom: 25px;
  }

  .print-qr-codes {
    visibility: hidden;
  }

  .print-qr-codes .qr-code {
    margin: 3rem 0;
  }

  .print-qr-codes .qr-code a {
    display: block;
    margin: 1rem 0;
  }

  @media print {
    .print-qr-codes {
      visibility: initial;
      margin: 2rem;
    }
  }
`;
