# Product Listing + Customer-Specific Cart (Supabase)

## What this assignment includes
- Supabase Auth login and signup
- Product listing
- Add to Cart
- Quantity update, remove and clear cart
- Customer-specific cart persistence
- Row Level Security (RLS)
- Products and cart_items database relationship


## Database flow
`auth.users` -> `cart_items.user_id`

`products.id` -> `cart_items.product_id`

The frontend reads cart rows joined with products. RLS ensures `auth.uid() = user_id`, so a logged-in customer cannot read or modify another customer's cart.
