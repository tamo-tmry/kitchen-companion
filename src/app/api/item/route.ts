import { getItemFromDynamoDB, addItemToDynamoDB } from "@/lib/db";

type Item = {
  id: string;
  name: string;
  expirationDate: Date;
  userId: string;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return new Response("userId is required", { status: 400 });
  }
  const result = await getItemFromDynamoDB(userId);
  return new Response(JSON.stringify(result), { status: 200 });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const params: Item = {
    id: data.name,
    name: data.name,
    expirationDate: data.expirationDate,
    userId: data.userId,
  };
  await addItemToDynamoDB<Item>(params);
  return new Response(null, { status: 200 });
}
