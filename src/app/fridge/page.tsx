import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FridgeList from "@/app/components/fridge/List";

export default async function Fridge() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return <FridgeList />;
}
