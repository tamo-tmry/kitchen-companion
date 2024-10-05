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

const getItems = async (userId: string) => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/item?userId=${userId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

type FridgeListProps = {
  userId: string;
};

export default async function FridgeList({ userId }: FridgeListProps) {
  const items = await getItems(userId);
  if (!items.length) {
    return <p>何もないよ</p>;
  }

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
