function FilterBar({ showOnlyActive, setShowOnlyActive, layout, setLayout }) {
  return (
    <div className="filter-bar">
      <label className="filter-checkbox">
        <input
          type="checkbox"
          checked={showOnlyActive}
          onChange={(e) => setShowOnlyActive(e.target.checked)}
        />
        Show only active members
      </label>

      <div className="layout-switch">
        <button
          className={layout === 'list' ? 'active' : ''}
          onClick={() => setLayout('list')}
        >
          List
        </button>
        <button
          className={layout === 'grid' ? 'active' : ''}
          onClick={() => setLayout('grid')}
        >
          Grid
        </button>
      </div>
    </div>
  );
}

export default FilterBar;