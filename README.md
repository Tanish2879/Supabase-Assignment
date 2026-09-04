# Product Listing + Customer-Specific Cart (Supabase)

## What this assignment includes
- Supabase Auth login and signup
- Product listing
- Add to Cart
- Quantity update, remove and clear cart
- Customer-specific cart persistence
- Row Level Security (RLS)
- Products and cart_items database relationship

## Username and Password 

- username : admin@example.com
- password : admin@2

- username : admin3@example.com
- password : admin@3

- username : admin4@example.com
- password : admin@4

- username : admin5@example.com
- password : admin@5


## Database flow
`auth.users` -> `cart_items.user_id`

`products.id` -> `cart_items.product_id`

The frontend reads cart rows joined with products. RLS ensures `auth.uid() = user_id`, so a logged-in customer cannot read or modify another customer's cart.
