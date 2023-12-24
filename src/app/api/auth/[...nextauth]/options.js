import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {authService} from "@/lib/services/authService";

export const options = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/account/login',
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const {email, password} = credentials

                const response = await authService.loginByEmailOrUsername({
                   emailOrUsername:email,
                   password:password
                })

                if(response.hasError){
                    throw new Error(JSON.stringify(response))
                }
                return response.Data;
            }
        })
    ],
    callbacks:{
        async jwt({token, user, session, account}){

            const response = await authService.generateToken({
                email: token.email,
            })

            if(!response.hasError){
                token.accessToken = response.Data.token
            }
            return token;
        },
        // The session callback is called whenever a session is checked.
        async session({session, token, user}){
            session.user = token
            return session
        },
        //signIn() callback to control if a user is allowed to sign in.
        async signIn(user) {

            if(user.account.provider === 'google'){
                const response = await authService.loginOrRegisterByOauth2({
                    provider: user.account.provider,
                    providerAccountId: user.user.provider,
                    name: user.user.name,
                    email: user.user.email,
                    emailVerified: user.profile.email_verified,
                    firstName: user.profile.given_name,
                    lastName: user.profile.family_name,
                    image: user.user.image,
                });

                if(response.hasError){
                    return false;
                }
           }
            return true;
        },
    }
}