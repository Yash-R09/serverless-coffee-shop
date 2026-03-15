import { useEffect, useState } from "react";

function App() {

  const API_URL = "https://awbl49tym7.execute-api.ap-south-1.amazonaws.com/dev/coffee";

  const [coffee, setCoffee] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const fetchCoffee = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setCoffee(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCoffee();
  }, []);

  // ADD coffee
  const addCoffee = async () => {

    const newCoffee = {
      coffeeId: Date.now().toString(),
      name,
      price: Number(price),
      stock: Number(stock)
    };

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCoffee)
    });

    fetchCoffee();

    setName("");
    setPrice("");
    setStock("");
  };

  // DELETE coffee
  const deleteCoffee = async (coffeeId) => {

    await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ coffeeId })
    });

    fetchCoffee();
  };

  // UPDATE stock
  const updateStock = async (coffeeId, newStock) => {

    await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coffeeId: coffeeId,
        stock: newStock
      })
    });

    fetchCoffee();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>☕ Serverless Coffee Shop</h1>

      <h2>Add Coffee</h2>

      <div style={{ marginBottom: "30px" }}>

        <input
          placeholder="Coffee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addCoffee}>Add</button>

      </div>

      <hr />

      <h2>Coffee Inventory</h2>

      {coffee.map(item => (
        <div key={item.coffeeId} style={{ marginBottom: "25px" }}>

          <h3>{item.name}</h3>

          <p>Price: ${item.price}</p>

          <p>Stock: {item.stock}</p>

          <button onClick={() => updateStock(item.coffeeId, item.stock + 1)}>
            +
          </button>

          <button onClick={() => updateStock(item.coffeeId, item.stock - 1)}>
            -
          </button>

          <button onClick={() => deleteCoffee(item.coffeeId)}>
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default App;