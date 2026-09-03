import Button from "./Button";

const MAX_QTY = 10;

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { id, name, price, image, quantity } = item;
  const subtotal = price * quantity;

  return (
    <div class="cart-item">
      <img src={image} alt={name} class="cart-item-image" />

      <div class="cart-item-details">
        <h4 class="cart-item-title">{name}</h4>
        <span class="cart-item-unit-price">₹{price.toLocaleString()} each</span>
      </div>

      <div class="cart-item-quantity">
        <Button
          label="-"
          variant="outline"
          class="qty-btn"
          onClick={() => onDecrease(id)}
          title={quantity === 1 ? "Remove from cart" : "Decrease quantity"}
        />

        <span class="qty-number">{quantity}</span>

        <Button
          label="+"
          variant="outline"
          class="qty-btn"
          disabled={quantity >= MAX_QTY}
          onClick={() => onIncrease(id)}
          title={
            quantity >= MAX_QTY
              ? `Max limit (${MAX_QTY}) reached`
              : "Increase quantity"
          }
        />
      </div>

      <div class="cart-item-subtotal">
        <span class="subtotal-label">Subtotal</span>
        <span class="subtotal-amount">₹{subtotal.toLocaleString()}</span>
      </div>

      <Button
        label="✕"
        variant="danger"
        class="remove-btn"
        onClick={() => onRemove(id)}
        title="Remove item"
      />
    </div>
  );
}

export default CartItem;
