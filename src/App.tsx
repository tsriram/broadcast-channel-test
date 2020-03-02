import React from "react";

function App() {
  const [message, setMessage] = React.useState("test");

  const channel = React.useMemo(() => new BroadcastChannel("message"), []);
  channel.onmessage = message => {
    console.log("message: ", message);
    setMessage(message.data);
  };

  React.useEffect(() => {
    return channel.close;
  }, [channel.close]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
    channel.postMessage(value);
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Broadcast Channel Test</h1>
      <input
        autoFocus
        onChange={handleChange}
        placeholder="Type a message here..."
        style={{ width: 300, height: 50 }}
        value={message}
      />
      <strong>Message:</strong>
      <p>{message}</p>
    </div>
  );
}

export default App;
