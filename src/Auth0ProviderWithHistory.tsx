import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider, AppState } from '@auth0/auth0-react';

interface Props {
    children: React.ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    // Adjust onRedirectCallback to accept optional parameters
    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain="dev-y63kymsgnlsf7ana.us.auth0.com"
            clientId="s08AhrzHoUZR7aQ3qCC7FrgUJvvfbwuT"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
