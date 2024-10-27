import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import TicketForm from './components/TicketForm';
import TicketDetails from './components/TicketDetails';
import HomeLayout from './components/HomeLayout';

const App: React.FC = () => {
    const [ticketCount, setTicketCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchTicketCount = async () => {
            try {
                const response = await fetch('https://be-fer-nrppw-linux-ew-ascjaqcfa9d6c8ff.westeurope-01.azurewebsites.net/api/Ticket/GetTicketCount');
                const data = await response.json();
                setTicketCount(data.ticketCount);
            } catch (error) {
                console.error('Error fetching ticket count:', error);
            }
        };

        fetchTicketCount();
    }, []);

    return (
        <Routes>
            {/* Home Layout Route */}
            <Route path="/" element={<HomeLayout />}>
                <Route
                    index
                    element={
                        <div>
                            {ticketCount !== null ? (
                                <p>Total tickets generated: {ticketCount}</p>
                            ) : (
                                <p>Loading ticket count...</p>
                            )}
                            <Link to="/generate-ticket">
                                <button>Proceed to Ticket Form</button>
                            </Link>
                        </div>
                    }
                />
                <Route path="generate-ticket" element={<TicketForm />} />
            </Route>

            {/* Separate Route for TicketDetails Page */}
            <Route path="/tickets/:id" element={<TicketDetails />} />
        </Routes>
    );
};

export default App;
