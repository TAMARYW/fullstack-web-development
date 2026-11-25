function OrderSummary({ totalScoops, pricePerScoop = 5, onClear }) {
  const totalPrice = totalScoops * pricePerScoop;

  return (
    <div className="order-summary-card">
      <h2>סיכום הזמנה</h2>
      
      {totalScoops === 0 ? (
        <p className="empty-order-msg">ההזמנה שלך ריקה כרגע 🍦</p>
      ) : (
        <div className="summary-details">
          <p>סך הכל כדורים: <strong>{totalScoops}</strong></p>
          <p>מחיר כולל: <strong>₪{totalPrice}</strong></p>
          {onClear && (
            <button className="btn-clear" onClick={onClear}>
              איפוס הזמנה
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderSummary;