import './DesktopModal.scss';

export default function DesktopModal({ onClose }) {
  return (
    <div className="desktop-modal-backdrop" onClick={onClose}>
      <div className="desktop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="desktop-modal__header">
          <h3>Routing Description</h3>
          <button className="desktop-modal__close" onClick={onClose}>×</button>
        </div>
        <p>
          The routing algorithm computes the shortest path between nodes
          using Dijkstra's algorithm with a time complexity of O(V^2),
          where V is the number of vertices.
        </p>
      </div>
    </div>
  );
}
