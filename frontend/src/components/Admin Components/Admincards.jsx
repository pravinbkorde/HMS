import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Admin Components/admincss/AdminCards.css';

export default function AdminCards() {
  const navigate = useNavigate();
  useEffect(() => {
  const storedTheme = localStorage.getItem('coreui-free-react-admin-template-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
}, []);

  const cardData = [
    {
      title: "Appointment",
      icon: "bi-calendar-check",
      color: "#4e73df",
      count: 124,
      url: "/dashboard/appointment"
    },
    {
      title: "Emergency",
      icon: "bi-exclamation-diamond",
      color: "#e74a3b",
      count: 18,
      url: "/dashboard/emergency"
    },
    {
      title: "IPD",
      icon: "bi-hospital",
      color: "#1cc88a",
      count: 86,
      url: "/ipd"
    },
    {
      title: "OPD",
      icon: "bi-person-lines-fill",
      color: "#f6c23e",
      count: 156,
      url: "/dashboard/opd"
    },
    {
      title: "Doctor",
      icon: "bi-person-badge",
      color: "#36b9cc",
      count: 42,
      url: "/doctor"
    },
    {
      title: "Department",
      icon: "bi-diagram-3",
      color: "#6f42c1",
      count: 12,
      url: "/dashboard/department"
    },
    {
      title: "Medical",
      icon: "bi-capsule",
      color: "#fd7e14",
      count: 1240,
      url: "/dashboard/medical"
    },
    {
      title: "Inventory",
      icon: "bi-box-seam",
      color: "#20c997",
      count: 578,
      url: "/dashboard/inventory"
    },
    {
      title: "Lab",
      icon: "bi-flask",
      color: "#6610f2",
      count: 324,
      url: "/dashboard/lab"
    },
    {
      title: "Cashier",
      icon: "bi-cash-stack",
      color: "#5a5c69",
      count: "$24.5k",
      url: "/dashboard/cashier"
    }
  ];

  return (
    <div className="admin-cards-container">
      {/* First Row - 5 Cards */}
      <div className="card-row">
        {cardData.slice(0, 5).map((card, index) => (
          <div className="card-col" key={index}>
            <div className="card admin-card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="icon-circle"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
                  </div>
                </div>
                <h4 className="card-title">{card.title}</h4>
                <div className="mt-3">
                  <div className="count-value">{card.count}</div>
                  <small className="text-muted">Total {card.title.toLowerCase()}</small>
                </div>
                <div className="card-actions mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => navigate(card.url)}
                  >
                    <i className="bi bi-arrow-right-circle me-1"></i> Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row - 5 Cards */}
      <div className="card-row">
        {cardData.slice(5, 10).map((card, index) => (
          <div className="card-col" key={index + 5}>
            <div className="card admin-card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="icon-circle"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
                  </div>
                </div>
                <h4 className="card-title">{card.title}</h4>
                <div className="mt-3">
                  <div className="count-value">{card.count}</div>
                  <small className="text-muted">Total {card.title.toLowerCase()}</small>
                </div>
                <div className="card-actions mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => navigate(card.url)}
                  >
                    <i className="bi bi-arrow-right-circle me-1"></i> Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
