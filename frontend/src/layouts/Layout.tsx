import Header from "@/components/shared/Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container max flex-1 py-10">
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
