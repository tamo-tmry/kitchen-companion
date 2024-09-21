"use client";

import { generateItemInfoByOpenAI } from "@/lib/openai";
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

  const [imageBase64, setImageBase64] = useState("");
  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      setImageBase64(reader.result as string);

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textPrompt: reader.result }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result.text);
      const resultTexts = result.text.split(",");
      console.log(resultTexts);
      setName(resultTexts[0]);
      setExpirationDate(resultTexts[1]);
      console.log(expirationDate);
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="file" name="image" onChange={uploadImage} />
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
