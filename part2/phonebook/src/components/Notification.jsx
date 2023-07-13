const Notification = ({ message }) => {
  if (message.body === '') {
    return null;
  }

  return (
    <div className={message.type === 'success' ? 'success' : 'error'}>
      {message.body}
    </div>
  );
};

export default Notification;
