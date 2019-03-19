import axios from 'axios';
import history from '../history';
import socket from '../api/socket';

export const addSekhra = async (sekhra, token) =>{
    const {
        from,
        to,
        description,
        items,
        customer
    } = sekhra;
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/sekhras`,
            {
                sekhra: {
                    from,
                    to,
                    description,
                    items
                },
                customer
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        socket.emit('addSekhra', response.data.sekhra);
        history.push('/customer/profile?action=wait');
    }catch(error) {
        throw error;
    }
};