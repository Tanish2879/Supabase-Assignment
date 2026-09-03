import { useState } from "react";
import CartItem from "./CartItem";
import Button from "./Button";
import Badge from "./Badge";
import EmptyState from "./EmptyState";

function Cart({ cartItems, onIncrease, onDecrease, onRemove, onClearCart, onCheckout }) {
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");

  const totalItemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,0,);
  const rawTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,0,);
  const discountAmount = Math.round((rawTotalPrice * discountPercent) / 100);
  const finalTotalPrice = rawTotalPrice - discountAmount;

  function handleApplyCoupon(e) {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === "SAVE10") {
      setDiscountPercent(10);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon. Try 'SAVE10'");
    }
  }

  function handleRemoveCoupon() {
    setCouponInput("");
    setDiscountPercent(0);
    setCouponError("");
  }

  return (
    <section class="cart-section" id="cart">
      <div class="cart-header">
        <div class="cart-title-wrapper">
          <h2 class="cart-title">Your Shopping Cart</h2>
          {totalItemCount > 0 && (
            <Badge
              text={`${totalItemCount} ${totalItemCount === 1 ? "item" : "items"}`}
              color="primary"/>
          )}
        </div>

        {cartItems.length > 0 && (
          <Button
            label="Clear Cart"
            variant="outline"
            onClick={onClearCart}
            class="clear-cart-btn"/>
        )}
      </div>

      {cartItems.length === 0 ? (
        <EmptyState
          message="Your cart is empty"
          description="Looks like you haven't added any products to your cart yet. Explore our catalog above!"
          icon="🛍️"
        />
      ) : (
        <div class="cart-content-layout">
          <div class="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>

          <div class="cart-summary-card">
            <h3 class="summary-title">Order Summary</h3>

            <div class="summary-row">
              <span>Total Items:</span>
              <span class="summary-value">{totalItemCount}</span>
            </div>

            <div class="summary-row">
              <span>Subtotal:</span>
              <span class="summary-value">
                ₹{rawTotalPrice.toLocaleString()}
              </span>
            </div>

            {discountPercent > 0 && (
              <div class="summary-row discount-row">
                <span>Discount ({discountPercent}% - SAVE10):</span>
                <span class="summary-value discount-val">
                  - ₹{discountAmount.toLocaleString()}
                </span>
              </div>
            )}

            <div class="summary-divider"></div>

            <div class="summary-row total-row">
              <span>Final Total:</span>
              <span class="summary-total-amount">
                ₹{finalTotalPrice.toLocaleString()}
              </span>
            </div>

            <form onSubmit={handleApplyCoupon} class="coupon-form">
              <label htmlFor="coupon-input" class="coupon-label">
                Have a promo code? (Try <code>SAVE10</code>)
              </label>
              <div class="coupon-input-group">
                <input
                  id="coupon-input"
                  type="text"
                  placeholder="Enter SAVE10"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    if (couponError) setCouponError("");
                  }}
                  disabled={discountPercent > 0}
                  class="coupon-input"
                />
                {discountPercent > 0 ? (
                  <Button
                    label="Remove"
                    variant="danger"
                    onClick={handleRemoveCoupon}
                  />
                ) : (
                  <Button
                    label="Apply"
                    variant="secondary"
                    type="submit"
                    disabled={!couponInput.trim()}
                  />
                )}
              </div>
              {couponError && <p class="coupon-error">{couponError}</p>}
              {discountPercent > 0 && (
                <p class="coupon-success">✓ SAVE10 applied (10% off)</p>
              )}
            </form>

            <Button
              label={`Checkout (₹${finalTotalPrice.toLocaleString()})`}
              variant="primary"
              class="checkout-btn"
              onClick={() => onCheckout(finalTotalPrice)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
