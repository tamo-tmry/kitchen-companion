import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import FridgeList from "@/components/ui/fridgeList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export default async function Fridge() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <>
      <FridgeList />
      <Button asChild>
        <Link href="/fridge/new">
          <CirclePlus className="h-4 w-4" />
        </Link>
      </Button>
      <Button>ボタン</Button>
    </>
  );
}
