import { useEffect, useState } from "react";

function App() {
  const [coffee, setCoffee] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const API_URL = "https://awbl49tym7.execute-api.ap-south-1.amazonaws.com/dev/coffee";

  // Fetch coffee list
  const fetchCoffee = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setCoffee(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCoffee();
  }, []);

  // Add coffee
  const addCoffee = async () => {

    const newCoffee = {
      coffeeId: Date.now().toString(),
      name,
      price: Number(price),
      stock: Number(stock)
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCoffee)
      });

      // refresh list
      fetchCoffee();

      // clear form
      setName("");
      setPrice("");
      setStock("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>☕ Serverless Coffee Shop</h1>

      <h2>Add Coffee</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <input
        placeholder="Stock"
        type="number"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />

      <button onClick={addCoffee}>Add Coffee</button>

      <hr />

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