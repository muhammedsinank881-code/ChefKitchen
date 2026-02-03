import React, { useState } from "react";
import { useOrderStore } from "../../../contexts/OrderStoreContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders, deleteOrder } = useOrderStore();
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const [selectedOrder, setSelectedOrder] = useState(null);


  const matchesSearch = (order) => {
    const term = search.toLowerCase();


    return (
      order.id.toLowerCase().includes(term) ||
      new Date(order.date).toLocaleString().toLowerCase().includes(term) ||
      order.orderType.toLowerCase().includes(term) ||
      String(order.final).includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  };

  const paymentMethod = (method) => {
    switch (method) {
      case 1:
        return "Credit Card"
      case 2:
        return "Paypal"
      case 3:
        return "Cash"
      default:
        return "Unknown"
    }
  }

  const filtered = orders.filter(matchesSearch)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between md:gap-10 lg:gap-100">
        <h1 className="text-2xl font-semibold mb-5 text-gray-700">Orders</h1>
        <input type="text"
          placeholder="Search... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-200 rounded-md" />
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 font-semibold text-sm
          hidden md:table-header-group">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Details</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-400">
                  No Orders Found
                </td>
              </tr>
            )}

            {filtered.map((order) => (
              <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50
              grid grid-cols-1 md:table-row md:grid-cols-none p-2 md:p-0">

                <td className="p-4 font-medium">
                  <span className="md:hidden font-semibold">Order ID : </span>
                  {order.id.slice(0, 8)}</td>

                <td className="p-4 md:table-cell flex md:block justify-between">
                  {new Date(order.date).toLocaleString()}
                  <span className="md:hidden">
                    <span className="font-semibold">Type :</span>
                    {order.orderType}
                  </span>
                </td>


                <td className="p-4 md:table-cell flex md:block justify-between">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
                  >
                    View
                  </button>
                  <span className="md:hidden"><button
                    onClick={() => deleteOrder(order.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button></span>
                </td>

                <td className="p-4 hidden md:flex">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
        {selectedOrder && (
          <div className="
      fixed inset-0 bg-transparent bg-opacity-40 
      backdrop-blur-sm flex items-center justify-center
      z-50
  ">
            <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/2 shadow-xl relative">

              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-3">
                Order Details - {selectedOrder.id.slice(0, 8)}
              </h2>

              <div className="flex flex-row justify-between">
                <p><b>Date:</b> {new Date(selectedOrder.date).toLocaleString()}</p>
                <p><b>Type:</b> {selectedOrder.orderType}</p>
              </div>
              <p><b>Total:</b> {selectedOrder.final} AED</p>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Items</h3>

                {selectedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 border-b last:border-none"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600 text-sm">Price: {item.price} AED</p>
                      <p className="text-gray-600 text-sm">Qty: {item.qty}</p>
                    </div>

                    <p className="font-semibold">{item.qty * item.price} AED</p>
                  </div>
                ))}
              </div>


            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
