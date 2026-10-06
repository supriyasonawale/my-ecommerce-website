import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories";
import { CategoryProducts } from "./pages/CategoryProducts";
import { GenderCategories } from "./pages/GenderCategories";
import { ProductDetails } from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";
import { Cart } from "./pages/Cart";
import { Shop } from "./pages/Shop";
import { WishlistProvider } from "./context/WishlistContext";
import { Wishlist } from "./pages/Wishlist";
import { Deals } from "./pages/Deals";
import { NewArrivals } from "./pages/NewArrivals";
import { Brands } from "./pages/Brands";
import { BrandProducts } from "./pages/BrandProducts";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Checkout } from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import { Account } from "./pages/Account";

import { Orders } from "./pages/Orders";
import { TrackOrder } from "./pages/TrackOrder";
import { HelpSupport } from "./pages/HelpSupport";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
     <WishlistProvider>
    <CartProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug"element={<CategoryProducts />}/>
<Route path="/cart"element={<Cart />}/>

<Route
  path="/wishlist"
  element={<Wishlist />}
/>


<Route
  path="/deals"
  element={<Deals />}
/>

<Route
  path="/new-arrivals"
  element={<NewArrivals />}
/>

<Route
  path="/brands"
  element={<Brands />}
/>

<Route
  path="/brands/:brand"
  element={<BrandProducts />}
/>

<Route
  path="/blog"
  element={<Blog />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>

<Route
  path="/checkout"
  element={<Checkout />}
/>

  <Route path="/category-group/:gender" element={<GenderCategories />}/>
     
        <Route path="/product/:id" element={<ProductDetails />}/>

<Route path="/login" element={<Login />} />

<Route path="/signup" element={<Signup />} />

<Route path="/account" element={<Account />} />
<Route path="/orders" element={<Orders />} />

<Route path="/track-order" element={<TrackOrder />} />
<Route
  path="/help-support"
  element={<HelpSupport />}
/>


      </Routes>

      </CartProvider>
      </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;