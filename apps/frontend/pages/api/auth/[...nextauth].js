import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {request, gql} from "graphql-request"
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const LOGIN_MUTATION = gql`
mutation LOGIN_MUTATION($email: String!, $password: String!){
  authenticateUserWithPassword(
    email: $email, 
    password: $password 
  ) {
   ... on UserAuthenticationWithPasswordSuccess {
    sessionToken
    item {
      id
      email
      siteId
    }
  }
    ... on UserAuthenticationWithPasswordFailure {
      message
    }
  }
}
`

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
      id: 'keystone',
      name: "keystone",
      credentials: {
        email: { label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          let variables = credentials
          let data =  await request(process.env.NEXT_PUBLIC_GRAPHQL_URL, LOGIN_MUTATION, variables)
          console.log('data', data)
          return {
            ...data.authenticateUserWithPassword.item,
            token: data.authenticateUserWithPassword.sessionToken
          }
          
        } catch (e) {
          console.log('error',e)
          return null
        }
      },
    }),
  ]
  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true
      },
      async jwt({token, user}) {
        console.log('jwtcallback');
        console.log('token, user', token, user);
        if (token && user) {
          token.accessToken = user.token
        }
        return token
      },
      async session({session, token, user}) {
        console.log('sessioncallback');
        console.log('session',session);
        console.log('token',token);
        console.log('user',user);
        session.token = token
        return session
      },
    },
  })
}