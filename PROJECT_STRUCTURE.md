# Project Structure - From Sagnay to Every Home

## File Organization by Authentication State

### For Unauthenticated Users (Visitors)
Located in `pages/unauth/`:
- `home.html` - Landing page with categories, featured products, and general information
- `home-products.html` - Product browsing page for visitors (read-only, login required for cart)

### For Authenticated Users (Logged-in)
Located in `pages/auth-user/`:
- `index.html` - Main dashboard for authenticated users
- `products.html` - Full product catalog with cart functionality
- `cart.html` - Shopping cart and checkout preparation

### Shared Components and Pages
#### Authentication Pages
Located in `auth/`:
- `login.html` - User login page
- `register.html` - User registration page  
- `reset.html` - Password reset page

#### Functional Pages
Located in `pages/`:
- `chat/` - Messaging system
  - `chat.html` - Main chat interface
  - `support/support.html` - Customer support chat
- `account/` - User account management
  - `profile/profile.html` - User profile management
  - `orders/orders.html` - Order history and tracking
- `payment/` - Payment and checkout system
  - `checkout/checkout.html` - Checkout process
- `product-details/` - Individual product pages
  - `product.html` - Detailed product view
- `categories/` - Category-specific pages
  - `agricultural.html` - Agricultural products category (example)

#### Assets and Resources
- `css/styles.css` - Main stylesheet
- `scripts/` - Organized JavaScript modules
  - `auth/` - Authentication related scripts
  - `cart/` - Shopping cart functionality
  - `products/` - Product management scripts
  - `ui/` - User interface components
  - `utils/` - Utility functions
  - `validation/` - Form validation scripts
- `images/` - Image assets
- `logos/` - Logo files

## Navigation Flow

### Unauthenticated User Flow:
1. `pages/unauth/home.html` (landing page)
2. `pages/unauth/home-products.html` (browse products)
3. `auth/login.html` or `auth/register.html` (authentication)
4. After login → Redirect to authenticated user flow

### Authenticated User Flow:
1. `pages/auth-user/index.html` (main dashboard)
2. `pages/auth-user/products.html` (product catalog)
3. `pages/product-details/product.html` (product details)
4. `pages/auth-user/cart.html` (shopping cart)
5. `pages/payment/checkout/checkout.html` (checkout)
6. `pages/account/` (account management)
7. `pages/chat/` (messaging)

## Key Linking Principles

### Relative Path Structure
- From `pages/unauth/`: Use `../../` to reach root assets
- From `pages/auth-user/`: Use `../../` to reach root assets
- From `pages/[category]/`: Use `../` to reach other page categories
- All script references use proper relative paths for GitHub deployment compatibility

### Cross-References
- Unauthenticated pages link to `auth/` for login/register
- Authenticated pages link to `pages/` subdirectories
- Product links always point to `pages/product-details/product.html`
- Category links point to respective `pages/categories/` files

## Deployment Considerations
- All paths are relative to ensure compatibility with both local development and GitHub Pages
- No absolute paths or localhost references
- Script modules use proper import/export structure
- CSS and image paths are consistent across all files

## Future Laravel Integration
- Category pages will be dynamically generated (currently only `agricultural.html` exists as example)
- User authentication state will be managed server-side
- File organization supports both static and dynamic content
