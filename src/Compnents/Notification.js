import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, duration }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  const styles = {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: type === 'success' ? 'green' : 'red',
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000,
  };

  return <div style={styles}>{message}</div>;
};

export default Notification;
