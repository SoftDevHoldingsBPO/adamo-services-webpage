export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-auto">{children}</main>;
}
