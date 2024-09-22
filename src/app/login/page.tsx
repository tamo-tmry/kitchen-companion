import LoginButton from "@/components/ui/loginButton";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <>
      <LoginButton />
    </>
  );
}
