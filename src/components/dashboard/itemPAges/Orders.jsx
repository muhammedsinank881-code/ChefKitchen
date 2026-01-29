import React, { useState } from "react";
import { useOrderStore } from "../../../contexts/OrderStoreContext";

const Orders = () => {
  const { orders, deleteOrder } = useOrderStore();
  const [search, setSearch] = useState("")
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

  const filtered = orders.filter(matchesSearch)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between md:gap-10 lg:gap-100">
        <h1 className="text-2xl font-semibold mb-5 text-gray-700">Orders</h1>
        <input type="text"
          placeholder="Search... "
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-200 rounded-md" />
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 font-semibold text-sm
          hidden md:table-header-group">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Type</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total (AED)</th>
              <th className="p-4">Status</th>
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

                <td className="p-4 hidden md:flex">
                  {order.orderType}</td>

                <td className="p-4 md:table-cell flex md:block justify-between">
                  <span>
                    <span className="md:hidden font-semibold">Items: </span>
                    {order.items.length} items
                  </span>
                  <span className="md:hidden font-semibold">
                    Total: {Number(order.final || 0).toFixed(2)}
                  </span>
                </td>

                <td className="p-4 hidden md:table-cell">
                  {Number(order.final || 0).toFixed(2)}
                </td>

                <td className="p-4 md:table-cell flex md:block justify-between">
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-semibold">
                    {order.status}
                  </span>
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
      </div>
    </div>
  );
};

export default Orders;
