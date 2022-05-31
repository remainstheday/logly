import { css } from "@emotion/react";

export const Styles = css`
  .qr-codes-container h3 {
    display: inline;
    margin-right: 1rem;
    margin-top: 2rem;
  }

  .qr-codes-container .qr-codes {
    display: flex;
  }

  .qr-codes-container .qr-code {
    display: flex;
    vertical-align: middle;
    align-items: center;
    margin: 1em 0;
    border: 1px solid #e1e5e9;
    padding: 0.5em;
    justify-content: space-between;
    background: #fafbfc;
  }

  .qr-codes-container a {
    font-size: 16px;
    margin: 0 10px;
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
