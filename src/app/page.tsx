import NameInput from "@/components/NameInput";
import NameDisplay from "@/components/NameDisplay";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <NameInput />
      <NameDisplay />
    </main>
  );
}
