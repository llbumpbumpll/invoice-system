import React from "react";
import { http } from "../api/http.js";
import { formatBaht } from "../utils.js";

export default function Reports() {
  const [allTime, setAllTime] = React.useState([]);
  const [byCustomer, setByCustomer] = React.useState([]);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    Promise.all([
      http("/api/reports/product-sales"),
      http("/api/reports/customer-sales"),
    ])
      .then(([a, b]) => { setAllTime(a); setByCustomer(b); })
      .catch((e) => setErr(String(e.message || e)));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Business Analytics</h3>
      </div>

      {err && <div className="alert alert-error">{err}</div>}

      <div className="card">
        <h4 className="mb-4">Total Sales Performance (By Product)</h4>
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-right">Quantity Sold</th>
                <th className="text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {allTime.map((r, idx) => (
                <tr key={idx}>
                  <td>
                    <span className="font-bold">{r.product_code}</span> - {r.product_name}
                  </td>
                  <td className="text-right">{Number(r.quantity_sold || 0).toLocaleString()}</td>
                  <td className="text-right font-bold text-primary">{formatBaht(r.value_sold)}</td>
                </tr>
              ))}
              {allTime.length === 0 && <tr><td colSpan="3" className="text-center p-4">No sales records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h4 className="mb-4">Customer Buying Patterns</h4>
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {byCustomer.map((r, idx) => (
                <tr key={idx}>
                  <td><span className="font-bold">{r.product_code}</span></td>
                  <td>{r.customer_name} ({r.customer_code})</td>
                  <td className="text-right">{Number(r.quantity_sold || 0).toLocaleString()}</td>
                  <td className="text-right font-bold">{formatBaht(r.value_sold)}</td>
                </tr>
              ))}
              {byCustomer.length === 0 && <tr><td colSpan="4" className="text-center p-4">No customer records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
