function FlavorCard({ flavor, onAdd, onRemove, isLimitReached }) {
  const { name, isSoldOut, scoopsSelected } = flavor;

  return (
    <div className={`flavor-card ${isSoldOut ? 'sold-out' : ''}`}>
      {isSoldOut && <span className="sold-out-badge">אזל מהמלאי</span>}
      
      <h3 className="flavor-name">{name}</h3>
      <div className="scoop-count">
        כדורים שנבחרו: <strong>{scoopsSelected}</strong>
      </div>

      <div className="card-actions">
        <button
          className="btn-scoop btn-remove"
          onClick={() => onRemove(flavor.id)}
          disabled={scoopsSelected === 0 || isSoldOut}
        >
          -
        </button>
        <button
          className="btn-scoop btn-add"
          onClick={() => onAdd(flavor.id)}
          disabled={isSoldOut || isLimitReached}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default FlavorCard;