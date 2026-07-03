import './MobileBottomDrawer.scss';

export default function MobileBottomDrawer({ onClose }) {
  return (
    <div className="mobile-drawer-backdrop" onClick={onClose}>
      <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-drawer__handle" />
        <div className="mobile-drawer__header">
          <h3>Routing Description</h3>
          <button className="mobile-drawer__close" onClick={onClose}>×</button>
        </div>
        <p>
          The routing algorithm computes the shortest path between nodes
          using Dijkstra's algorithm with a time complexity of O(V^2).
        </p>
      </div>
    </div>
  );
}
