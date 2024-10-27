import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const TicketDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently, isLoading } = useAuth0();
    const [ticketDetails, setTicketDetails] = useState<{
        vatin: string;
        firstName: string;
        lastName: string;
        createdAt: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchTicketDetails = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log('Access token:', token);
            const response = await fetch(`https://be-fer-nrppw-linux-ew-ascjaqcfa9d6c8ff.westeurope-01.azurewebsites.net/api/Ticket/GetTicketDetails/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new  Error(`Failed to fetch ticket details: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Fetched ticket details:", data); // Debugging log
            setTicketDetails(data);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            setError('Failed to load ticket details. Please try again later.');
        }
    };

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                loginWithRedirect({
                    appState: { returnTo: `/tickets/${id}` }
                });
            } else {
                fetchTicketDetails();
                console.log('User:', user);
            }
        }
    }, [isAuthenticated, isLoading, id, loginWithRedirect, getAccessTokenSilently]);

    if (isLoading) return <p>Loading authentication...</p>;
    if (!isAuthenticated) return <p>Redirecting to login...</p>;

    return (
        <div>
            <h2>Ticket Details</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {ticketDetails ? (
                <div>
                    <p><strong>OIB:</strong> {ticketDetails.vatin}</p>
                    <p><strong>First Name:</strong> {ticketDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {ticketDetails.lastName}</p>
                    <p><strong>Created At:</strong> {new Date(ticketDetails.createdAt).toLocaleString()}</p>
                    <p><strong>Current User:</strong> {user?.name}</p>
                </div>
            ) : (
                !error && <p>Loading ticket details...</p>
            )}
        </div>
    );
};

export default TicketDetails;
