import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Content() {
  useEffect(() => {
    // Inicialización de gráficos de AdminLTE utilizando Chart.js
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      // Gráfico de barras
      new window.Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [{
            label: "Ventas por mes",
            data: [65, 59, 80, 81, 56],
            backgroundColor: "#007236",
            borderColor: "#007236",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Gráfico de línea
      new window.Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [{
            label: "Ganancias mensuales",
            data: [33, 55, 75, 90, 45],
            fill: false,
            borderColor: "#FF6600",
            tension: 0.1
          }]
        },
        options: {
          responsive: true
        }
      });

      // Gráfico de torta (pie)
      new window.Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: ["Producto A", "Producto B", "Producto C"],
          datasets: [{
            label: "Distribución de productos",
            data: [35, 45, 20],
            backgroundColor: ["#007236", "#FF6600", "#F0F0E6"]
          }]
        },
        options: {
          responsive: true
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="content-wrapper" style={{ backgroundColor: "#F0F0E6" }}>
      <section className="content py-4">
        <div className="container-fluid px-3 px-md-4">
          <div className="row g-4 justify-content-center">
            {/* Gráfico de barras */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Ventas por Mes</h3>
                </div>
                <div className="card-body">
                  <canvas id="barChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de línea */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Ganancias Mensuales</h3>
                </div>
                <div className="card-body">
                  <canvas id="lineChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de torta (pie) */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Distribución de Productos</h3>
                </div>
                <div className="card-body">
                  <canvas id="pieChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
