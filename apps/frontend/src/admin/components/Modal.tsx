export default function Modal({ open, onClose, children }: any) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
