function Header({ showOnlyAvailable, setShowOnlyAvailable }) {
  return (
    <header className="kiosk-header">
      <h1>🍦 Ice-Cream Kiosk</h1>
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={showOnlyAvailable}
          onChange={(e) => setShowOnlyAvailable(e.target.checked)}
        />
        הצג רק טעמים זמינים
      </label>
    </header>
  );
}

export default Header;