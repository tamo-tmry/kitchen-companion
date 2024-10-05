import FridgeForm from "@/components/ui/fridgeForm";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function FridgeNew() {
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  return <FridgeForm userId={userId} />;
}
