import React from 'react';
import buildClient from '../api/build-client';

const LandingPage = ({currentUser}) => {
    return currentUser ? <h1>You are signedIn</h1> : <h1>You aren't signedIn</h1>;
}

LandingPage.getInitialProps = async ({req}) => {
    console.log('LandingPage');
    const client = buildClient({req});
    const {data} = await client.get('/api/users/currentUser');

    return data;
};

export default LandingPage;1