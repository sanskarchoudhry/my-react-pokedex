export default function InfoItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="text-gray-dark opacity-75 whitespace-nowrap">{label}</div>
      <div>{value}</div>
    </div>
  );
}
