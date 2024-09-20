"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FridgeNew() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const addFridgeItem = () => {
    if (!name || !expirationDate) return;
    const fridgeItemsJSON = localStorage.getItem("fridgeItems");
    const originFridgeItems = fridgeItemsJSON
      ? JSON.parse(fridgeItemsJSON)
      : [];
    const item = [...originFridgeItems, { name, expirationDate }];
    localStorage.setItem("fridgeItems", JSON.stringify(item));
    router.push("/fridge");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        name="name"
        type="text"
        value={name}
        className="bg-black border border-white"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="expirationDate"
        type="date"
        value={expirationDate}
        className="mt-4 bg-black border border-white"
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button className="mt-4" onClick={() => addFridgeItem()}>
        冷蔵庫に入れる
      </button>
    </form>
  );
}
