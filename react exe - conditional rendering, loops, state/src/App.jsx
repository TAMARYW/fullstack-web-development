import { useState } from 'react';
import Header from './components/Header';
import Notice from './components/Notice';
import FlavorCard from './components/FlavorCard';
import OrderSummary from './components/OrderSummary';
import './App.css';

function App() {
  const [flavors, setFlavors] = useState([
    { id: 1, name: 'ווניל', isSoldOut: false, scoopsSelected: 0 },
    { id: 2, name: 'שוקולד בלגי', isSoldOut: false, scoopsSelected: 0 },
    { id: 3, name: 'פיסטוק', isSoldOut: true, scoopsSelected: 0 },
    { id: 4, name: 'תות שדה', isSoldOut: false, scoopsSelected: 0 },
    { id: 5, name: 'מנגו סורבה', isSoldOut: false, scoopsSelected: 0 },
    { id: 6, name: 'ריבת חלב', isSoldOut: true, scoopsSelected: 0 },
  ]);

  const [scoopLimit] = useState(5);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const totalScoops = flavors.reduce((sum, f) => sum + f.scoopsSelected, 0);
  const isLimitReached = totalScoops >= scoopLimit;

  const handleAddScoop = (id) => {
    if (isLimitReached) return;

    setFlavors((prev) =>
      prev.map((f) =>
        f.id === id && !f.isSoldOut
          ? { ...f, scoopsSelected: f.scoopsSelected + 1 }
          : f
      )
    );
  };

  const handleRemoveScoop = (id) => {
    setFlavors((prev) =>
      prev.map((f) =>
        f.id === id && f.scoopsSelected > 0
          ? { ...f, scoopsSelected: f.scoopsSelected - 1 }
          : f
      )
    );
  };

  const handleClearOrder = () => {
    setFlavors((prev) => prev.map((f) => ({ ...f, scoopsSelected: 0 })));
  };

  const visibleFlavors = showOnlyAvailable
    ? flavors.filter((f) => !f.isSoldOut)
    : flavors;

  return (
    <div className="kiosk-app">
      <Header
        showOnlyAvailable={showOnlyAvailable}
        setShowOnlyAvailable={setShowOnlyAvailable}
      />

      <main className="kiosk-container">
        {isLimitReached && (
          <Notice message={`הגעת למגבלה המרבית של ${scoopLimit} כדורים להזמנה!`} />
        )}

        {visibleFlavors.length === 0 ? (
          <div className="empty-flavors-msg">
            אין טעמים זמינים להצגה כרגע.
          </div>
        ) : (
          <div className="flavors-grid">
            {visibleFlavors.map((flavor) => (
              <FlavorCard
                key={flavor.id}
                flavor={flavor}
                onAdd={handleAddScoop}
                onRemove={handleRemoveScoop}
                isLimitReached={isLimitReached}
              />
            ))}
          </div>
        )}

        <OrderSummary
          totalScoops={totalScoops}
          pricePerScoop={5}
          onClear={handleClearOrder}
        />
      </main>
    </div>
  );
}

export default App;