"use client";

import { useState } from "react";

export default function FridgeNew() {
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const addFridgeItem = () => {
    const fridgeItemsJSON = localStorage.getItem("fridgeItems");
    const originFridgeItems = fridgeItemsJSON
      ? JSON.parse(fridgeItemsJSON)
      : [];
    const item = [...originFridgeItems, { name, expirationDate }];
    localStorage.setItem("fridgeItems", JSON.stringify(item));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="expirationDate"
        type="date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button onClick={() => addFridgeItem()}>冷蔵庫に入れる</button>
    </form>
  );
}
