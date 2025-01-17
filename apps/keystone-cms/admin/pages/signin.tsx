/** @jsxRuntime classic */
/** @jsx jsx */

import { FormEvent, Fragment, useEffect, useRef, useState } from "react";

import { Button } from "@keystone-ui/button";
import { Center, H1, jsx, Stack, VisuallyHidden } from "@keystone-ui/core";
import { TextInput } from "@keystone-ui/fields";
import { Notice } from "@keystone-ui/notice";

import { useRedirect } from "@keystone-6/auth/src/lib/useFromRedirect";
import { gql, useMutation } from "@keystone-6/core/admin-ui/apollo";
import {
  useRawKeystone,
  useReinitContext,
} from "@keystone-6/core/admin-ui/context";
import { useRouter } from "@keystone-6/core/admin-ui/router";
import { LoadingDots } from "@keystone-ui/loading";

export default function Login() {
  const mutationName = "authenticateUserWithPassword";
  const identityField = "email";
  const secretField = "password";
  const successTypename = "UserAuthenticationWithPasswordSuccess";
  const failureTypename = "UserAuthenticationWithPasswordFailure";
  const mutation = gql`
        mutation($identity: String!, $secret: String!) {
        authenticate: ${mutationName}(${identityField}: $identity, ${secretField}: $secret) {
        ... on ${successTypename} {
        item {
        id
        }
        }
        ... on ${failureTypename} {
        message
        }
        }
        }
    `;

  const [state, setState] = useState({ identity: "", secret: "" });

  const identityFieldRef = useRef<HTMLInputElement>(null);

  const [mutate, { error, loading, data }] = useMutation(mutation);
  const reinitContext = useReinitContext();
  const router = useRouter();
  const rawKeystone = useRawKeystone();
  const redirect = useRedirect();

  // This useEffect specifically handles ending up on the signin page from a SPA navigation
  useEffect(() => {
    if (rawKeystone.authenticatedItem.state === "authenticated") {
      router.push(redirect);
    }
  }, [rawKeystone.authenticatedItem, router, redirect]);

  if (rawKeystone.authenticatedItem.state === "authenticated") {
    return (
      <Center fillView>
        <LoadingDots label="Loading page" size="large" />
      </Center>
    );
  }

  return (
    <div
      css={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src="https://logly.world/images/Logo.png"
        alt="Logly"
        css={{
          padding: "10px",
        }}
      />
      <form
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          try {
            let result = await mutate({
              variables: {
                identity: state.identity,
                secret: state.secret,
              },
            });
            if (result.data.authenticate?.__typename !== successTypename) {
              return;
            }
          } catch (err) {
            return;
          }
          reinitContext();
          router.push(redirect);
        }}
      >
        <H1 style={{ textAlign: "center" }}>Sign In</H1>
        {error && (
          <Notice title="Error" tone="negative">
            {error.message}
          </Notice>
        )}
        {data?.authenticate?.__typename === failureTypename && (
          <Notice title="Error" tone="negative">
            {data?.authenticate.message}
          </Notice>
        )}
        <Stack gap="medium">
          <VisuallyHidden as="label" htmlFor="identity">
            {identityField}
          </VisuallyHidden>
          <TextInput
            id="identity"
            name="identity"
            value={state.identity}
            onChange={(e) => setState({ ...state, identity: e.target.value.toLocaleLowerCase() })}
            placeholder={identityField}
            ref={identityFieldRef}
          />
          <Fragment>
            <VisuallyHidden as="label" htmlFor="password">
              {secretField}
            </VisuallyHidden>
            <TextInput
              id="password"
              name="password"
              value={state.secret}
              onChange={(e) => setState({ ...state, secret: e.target.value })}
              placeholder={secretField}
              type="password"
            />
          </Fragment>
        </Stack>

        <Button
          weight="bold"
          tone="active"
          isLoading={
            loading ||
            // this is for while the page is loading but the mutation has finished successfully
            data?.authenticate?.__typename === successTypename
          }
          type="submit"
          css={{ marginTop: "20px" }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
