import React, { useState } from 'react';

const TicketForm: React.FC = () => {
    const [vatin, setVatin] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qrCode, setQrCode] = useState<string | null>(null);

    const getAuthToken = async () => {
        const response = await fetch('https://be-fer-nrppw-windows-ew-g6h2ghb6gkajhxcj.westeurope-01.azurewebsites.net/api/Ticket/getAuthToken');
        const data = await response.json();
        console.log(data);
        return data.access_token;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = await getAuthToken();

            const response = await fetch('https://be-fer-nrppw-windows-ew-g6h2ghb6gkajhxcj.westeurope-01.azurewebsites.net/api/Ticket/GenerateTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ VATIN: vatin, FirstName: firstName, LastName: lastName })
            });

            if (response.ok) {
                const blob = await response.blob();
                setQrCode(URL.createObjectURL(blob));
            } else {
                console.error('Error generating ticket');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Generate Ticket</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="VATIN"
                    value={vatin}
                    onChange={(e) => setVatin(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <button type="submit">Generate QR Code</button>
            </form>
            {qrCode && (
                <div>
                    <h3>Your QR Code:</h3>
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

export default TicketForm;
