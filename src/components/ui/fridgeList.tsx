"use client";

type FridgeItemType = {
  name: string;
  expirationDate: string;
};

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "@formkit/tempo";

export default function FridgeList() {
  const fridgeItemJSON = localStorage.getItem("fridgeItems");
  if (!fridgeItemJSON) {
    return <p>何もないよ</p>;
  }

  const items = JSON.parse(fridgeItemJSON);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8/12">商品名</TableHead>
          <TableHead className="w-4/12">賞味期限</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: FridgeItemType) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{format(item.expirationDate, "YYYY-MM-DD")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
