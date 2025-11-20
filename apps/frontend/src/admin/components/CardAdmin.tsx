export default function CardAdmin({ title, onClick }: any) {
  return (
    <div className="admin-card" onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
}
