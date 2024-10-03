import FridgeForm from "@/components/ui/fridgeForm";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function FridgeNew() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return <FridgeForm userId={session.user.id} />;
}
