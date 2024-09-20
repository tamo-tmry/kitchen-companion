import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FridgeList from "@/app/components/fridge/List";
import Link from "next/link";

export default async function Fridge() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <FridgeList />
      <Link href="/fridge/new">冷蔵庫に入れる</Link>
    </>
  );
}
