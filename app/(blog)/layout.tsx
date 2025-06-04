export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-auto">{children}</main>;
}
