function Header({ showResults, setShowResults }) {
  return (
    <header className="poll-header">
      <h1>🗳️ סקר בחירות לראשות הממשלה</h1>
      <button 
        className="btn-toggle"
        onClick={() => setShowResults((prev) => !prev)}
      >
        {showResults ? 'הסתר תוצאות' : 'הצג תוצאות'}
      </button>
    </header>
  );
}

export default Header;