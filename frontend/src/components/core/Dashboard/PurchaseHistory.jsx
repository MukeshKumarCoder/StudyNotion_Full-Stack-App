import React, { useEffect, useState } from "react";
import { getAllPurchaseHistory } from "../../../services/operations/studentFeaturesAPI";
import { useSelector } from "react-redux";

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const loadHistory = async () => {
      try {
        const data = await getAllPurchaseHistory(token);
        setPurchases(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [token]);

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (purchases.length === 0)
    return (
      <div className="grid flex-1 place-items-center">
        <p className="text-richBlack-50">No purchases found.</p>
      </div>
    );
  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div
            key={purchase._id}
            className="p-4 rounded-lg bg-gray-800 shadow-md border border-gray-700"
          >
            <h3 className="text-lg font-semibold">
              {purchase.course?.courseName ?? "Course"}
            </h3>
            <p className="text-sm text-gray-400">
              Purchased on:{" "}
              {new Date(
                purchase.purchasedAt || purchase.createdAt
              ).toLocaleDateString()}
            </p>
            <p className="text-sm text-green-400 font-medium">
              Amount: ₹{purchase.amount}
            </p>
            <p className="text-sm text-yellow-400">
              Payment ID: {purchase.paymentId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
