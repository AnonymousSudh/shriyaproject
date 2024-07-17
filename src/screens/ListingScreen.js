import React, { useEffect, useState } from 'react'
import { getData, fetchDataByQuery, deleteData } from '../utils/api'
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { List, Card, Typography, Avatar, Button } from 'antd';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import Notification from '../Compnents/Notification';

const { Title, Text } = Typography;

function ListingScreen() {
    const [data, setData] = useState('')
    const [selectedCard, setSelectedCard] = useState(null); // State to track selected card
    const [notification, setNotification] = useState(null);
    const storedUserId = localStorage.getItem('userId');

    const onCardClick = (item) => {
        if (selectedCard) {
            console.log("hello")
            setSelectedCard(null);
        }
        setSelectedCard(item.id);
    }
    const onDelete = async (id) => {
        try {
            await deleteData('deleteResponse', id);
            setData(data.filter(item => item.id !== id));
            setNotification({ message: 'Card deleted successfully!', type: 'success' });
            setTimeout(() => {
                setNotification(null);
            }, 3000); // Reset notification after 3 seconds

            console.log(`Deleted item with id: ${id}`);
        } catch (error) {
            console.log(`Failed to delete item with id: ${id}`);
        }
    }

    const onEdit = (id) => {
        // Handle edit action
        console.log(`Editing item with id: ${id}`);
        // Add your edit logic here, e.g., open a modal to edit the item details
    }

    const getaResponse = async () => {
        const result = await fetchDataByQuery('savedresponses', { userId: storedUserId });
        setData(result)
        console.log(result);
    }
    useEffect(() => {
        getaResponse()
    }, [])
    return (
        <div>
            {notification && (
                <Notification message={notification.message} type={notification.type} duration={3000} />
            )}
            <Title level={2}>Data List</Title>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card onClick={() => onCardClick(item)} hoverable>
                            {/* <List.Item.Meta
                                avatar={<Avatar src={item.imageLinks} />}
                                title={`ID: ${item.id}`}
                            /> */}
                            <Text><strong>Name:</strong> {item.name}</Text><br />
                            <Text><strong>Creation Date:</strong> {item.creationDate}</Text><br />
                            <Text><strong>Response Codes:</strong> {item.responseCodes}</Text><br />
                            <Text><strong>Image Link:</strong> {item.imageLinks}</Text><br />
                            {(selectedCard == item.id) && (
                                <div style={{ marginTop: '10px' }}>
                                    <img src={item.imageLinks} alt={item.name} style={{ width: '250px', height: '250px' }} />
                                    <div style={{ marginTop: '10px', }}>
                                        <Button type="primary" onClick={() => onEdit(item.id)}>Edit</Button>
                                        <Button type="danger" onClick={() => onDelete(item.id)} style={{ marginTop: '20px' }}>Delete</Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ListingScreen