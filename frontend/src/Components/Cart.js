import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { clearCart, removeCart } from "../utils/cartSlice";

const Cart = () => {
  const isLogin = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const cartItems = useSelector((state) => state.cart); 

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

 
  
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id) => {
    dispatch(removeCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0)
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Cart is Empty</h2>
        <Link
          to="/"
          className="btn btn-primary mt-4 hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      {/* Cart items list */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://www.quercusbooks.co.uk/wp-content/uploads/2019/01/Spines-website-asset-new-logo.jpg?w=1920&h=560&crop=1"
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-xl font-bold text-gray-900">Rs. {item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="btn btn-outline btn-sm text-red-600 hover:bg-red-100 hover:text-red-700"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="mt-6 flex justify-between items-center p-4 bg-blue-100 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-900">Total: Rs. {totalPrice}</h3>
        <div className="flex gap-4">
          <button
            className="btn btn-outline btn-sm text-red-600 hover:bg-red-100 hover:text-red-700"
            onClick={handleClearCart}
          >
            Clear Cart
          </button >
          <Link
            to="/checkout"
           
          >
            <button className="btn btn-primary btn-sm hover:bg-blue-600 transition-colors"> 
            Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
