import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../Context/user/UserContext";

export default function Content() {
  const { usuario } = useContext(UserContext);
  const filialNombre = usuario?.filial || "Mi Filial";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      new window.Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: "Altas",
              data: [45, 50, 60, 40, 55],
              backgroundColor: "#007236",
              borderColor: "#007236",
              borderWidth: 1,
            },
            {
              label: "Bajas",
              data: [10, 15, 12, 8, 14],
              backgroundColor: "#FF6600",
              borderColor: "#FF6600",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      new window.Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: `Remesas - ${filialNombre}`,
              data: [5200, 6100, 5900, 6700, 7100],
              fill: false,
              borderColor: "#007236",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      new window.Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: ["Activos", "Inactivos"],
          datasets: [
            {
              label: `Afiliados ${filialNombre}`,
              data: [420, 80],
              backgroundColor: ["#007236", "#FF6600"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    };
    document.body.appendChild(script);
  }, [filialNombre]);

  return (
    <div className="content-wrapper" style={{ backgroundColor: "#F0F0E6" }}>
      <section className="content py-4">
        <div className="container-fluid px-3 px-md-4">
          <div className="row g-4 justify-content-center">
            {/* Gráfico de barras */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Altas y Bajas - {filialNombre}</h3>
                </div>
                <div className="card-body">
                  <canvas id="barChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de líneas */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Remesas - {filialNombre}</h3>
                </div>
                <div className="card-body">
                  <canvas id="lineChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de torta */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Afiliados - {filialNombre}</h3>
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
