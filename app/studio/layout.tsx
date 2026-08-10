export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh min-h-dvh w-screen overflow-hidden bg-white">
      {children}
    </div>
  );
}
