import { useEffect, useState } from "react";

function App() {
  const API_URL = "https://awbl49tym7.execute-api.ap-south-1.amazonaws.com/dev/coffee";

  const [coffee, setCoffee] = useState([]);
  const [filteredCoffee, setFilteredCoffee] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  // Fetch
  const fetchCoffee = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const safeData = data.map(item => ({
        coffeeId: item.coffeeId,
        name: item.name || "",
        price: item.price || 0,
        stock: item.stock || 0
      }));

      setCoffee(safeData);
      setFilteredCoffee(safeData);
    } catch {
      showMessage("Error fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoffee();
  }, []);

  // Search + Sort
  useEffect(() => {
    let updated = [...coffee];

    updated = updated.filter(item =>
      (item.name || "").toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "price") updated.sort((a, b) => a.price - b.price);
    if (sortBy === "stock") updated.sort((a, b) => a.stock - b.stock);

    setFilteredCoffee(updated);
  }, [search, sortBy, coffee]);

  // Toast
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // Add
  const addCoffee = async () => {
    if (!name || !price || !stock) return showMessage("Fill all fields");

    const newCoffee = {
      coffeeId: Date.now().toString(),
      name,
      price: Number(price),
      stock: Number(stock)
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoffee)
      });

      showMessage("Added ✅");
      fetchCoffee();

      setName("");
      setPrice("");
      setStock("");
    } catch {
      showMessage("Error adding item");
    }
  };

  // Delete
  const deleteCoffee = async (coffeeId) => {
    if (!window.confirm("Delete this coffee?")) return;

    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coffeeId })
      });

      showMessage("Deleted ❌");
      fetchCoffee();
    } catch {
      showMessage("Error deleting");
    }
  };

  // Update stock
  const updateStock = async (coffeeId, newStock) => {
    if (newStock < 0) return;

    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coffeeId,
          stock: newStock
        })
      });

      showMessage("Stock Updated 🔄");
      fetchCoffee();
    } catch {
      showMessage("Error updating stock");
    }
  };

  // Start edit (ONLY PRICE)
  const startEdit = (item) => {
    setEditingId(item.coffeeId);
    setEditPrice(item.price);
  };

  // Save edit (ONLY PRICE)
  const saveEdit = async (coffeeId) => {
    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coffeeId,
          price: Number(editPrice)
        })
      });

      setEditingId(null);
      showMessage("Price Updated 💰");
      fetchCoffee();
    } catch {
      showMessage("Error updating");
    }
  };

  const totalItems = coffee.length;
  const totalStock = coffee.reduce((sum, item) => sum + item.stock, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">☕ Coffee Inventory</h1>

        {message && (
          <div className="bg-black text-white p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        <div className="flex justify-between mb-6 bg-gray-100 p-4 rounded-xl">
          <div><b>Total Items:</b> {totalItems}</div>
          <div><b>Total Stock:</b> {totalStock}</div>
        </div>

        {/* Add */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <input className="border p-2 rounded" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="border p-2 rounded" type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
          <input className="border p-2 rounded" type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
          <button className="bg-green-500 text-white px-4 rounded" onClick={addCoffee}>Add</button>
        </div>

        {/* Search + Sort */}
        <div className="flex gap-3 mb-6">
          <input
            className="border p-2 rounded flex-1"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select className="border p-2 rounded" onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </div>

        {/* List */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredCoffee.map(item => (
            <div key={item.coffeeId} className="border p-4 rounded-xl mb-4 shadow-sm">

              {editingId === item.coffeeId ? (
                <div className="flex gap-2 mb-2">
                  {/* NAME READ ONLY */}
                  <p className="font-semibold">{item.name || "Unnamed Coffee"}</p>

                  {/* EDIT ONLY PRICE */}
                  <input
                    className="border p-1 rounded"
                    type="number"
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                  />

                  <button
                    className="bg-blue-500 text-white px-2 rounded"
                    onClick={() => saveEdit(item.coffeeId)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">
                    {item.name || "Unnamed Coffee"}
                  </h3>
                  <p>Price: ₹{item.price}</p>
                </>
              )}

              <p>
                Stock: {item.stock}{" "}
                {item.stock < 5 && <span className="text-red-500 font-bold">⚠️ Low</span>}
              </p>

              <div className="flex gap-2 mt-2 flex-wrap">
                <button className="bg-gray-200 px-2 rounded" onClick={() => updateStock(item.coffeeId, item.stock + 1)}>+</button>
                <button className="bg-gray-200 px-2 rounded" onClick={() => updateStock(item.coffeeId, item.stock - 1)}>-</button>
                <button className="bg-yellow-400 px-2 rounded" onClick={() => startEdit(item)}>Edit</button>
                <button className="bg-red-500 text-white px-2 rounded" onClick={() => deleteCoffee(item.coffeeId)}>Delete</button>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default App;