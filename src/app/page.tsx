import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  redirect("/fridge"); // 他のコンテンツができるまでは冷蔵庫ページにリダイレクトする

  return <div>HomePage</div>;
}
