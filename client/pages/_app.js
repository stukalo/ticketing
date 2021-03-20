import React from 'react';
import buildClient from '../api/build-client';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
            <Component {...pageProps} />
        </div>
    );
};

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentUser');

    let initialProps = {};

    if (appContext.Component.getInitialProps) {
        initialProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
        initialProps,
        ...data,
    };
}

export default AppComponent;
