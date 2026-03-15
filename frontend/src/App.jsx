import { useEffect, useState } from "react";

function App() {
  const [coffee, setCoffee] = useState([]);

  useEffect(() => {
    fetch("https://awbl49tym7.execute-api.ap-south-1.amazonaws.com/dev/coffee")
      .then(res => res.json())
      .then(data => setCoffee(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>☕ Serverless Coffee Shop</h1>

      {coffee.map(item => (
        <div key={item.coffeeId} style={{ marginBottom: "20px" }}>
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          <p>Stock: {item.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default App;