"use client";

import FridgeItem, {
  FridgeItem as FridgeItemType,
} from "@/app/components/fridge/Item";

export default function FridgeList() {
  const fridgeItemJSON = localStorage.getItem("fridgeItems");
  if (!fridgeItemJSON) {
    return <p>何もないよ</p>;
  }

  const items = JSON.parse(fridgeItemJSON);

  return (
    <ul>
      {items.map((item: FridgeItemType) => (
        <li key={item.name} className="flex mb-4">
          <FridgeItem item={item} />
        </li>
      ))}
    </ul>
  );
}
