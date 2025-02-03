import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faSearch,
  faSignOutAlt,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [signals, setSignals] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName'); // Récupérez le nom de l'utilisateur
  useEffect(() => {
    document.body.style.justifyContent = "flex-start";
    document.body.style.alignItems = "center";

    return () => {
      document.body.style.display = "";
      document.body.style.justifyContent = "";
      document.body.style.alignItems = "";
      document.body.style.height = "";
    };
  }, []);

  // Gérer la sélection du fichier
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Simuler des signaux et des métriques
    const mockSignals = {
      x: Array.from({ length: 1000 }, (_, i) => i + 1),
      y: Array.from({ length: 1000 }, () => Math.random() * 100),
    };
    setSignals(mockSignals);
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div id="root" style={{ width: "100%", height: "100%" }}>
      <div className="dashboard">
        {/* Barre latérale */}
        <div className="sidebar">
          <div className="logo-container" style={{ height: "75px" ,marginTop: '10px'}}>
            <img
              src="/images/epilepsia.png"
              alt="EpilepTrack Logo"
              className="logo"
            />
          </div>
          <h1>EpilepTrack</h1>

          <ul>
          <li style={{ marginBottom: '35px' }}>

            <div className="user-info">
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: '#1a5e7d' }} />
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Dr. {userName}</span>
            </div>
            </li>

            <li>
              <button onClick={() => alert("Feature Extraction clicked")}>
                <FontAwesomeIcon icon={faChartLine} />
                Feature Extraction
              </button>
            </li>
            <li>
              <button onClick={() => alert("Detection clicked")}>
                <FontAwesomeIcon icon={faSearch} />
                Detection
              </button>
            </li>
          </ul>
          {/* Déconnexion en bas */}
          <ul style={{ marginTop: "370px" }}>
            <li>
              <div className="logout-container">
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>

        {/* Contenu principal */}
        <div className="main-content">
          {/* Section d'importation de fichiers */}
          {!signals && (
            <div className="upload-section">
              <h2>Upload Your EDF File</h2>
              <p>Please upload your EDF file to start the analysis.</p>
              <input
                type="file"
                id="file-upload"
                accept=".edf"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <label htmlFor="file-upload">
                <FontAwesomeIcon icon={faUpload} /> Choose a file
              </label>
            </div>
          )}

          {/* Section des signaux */}
          {signals && (
            <div className="signals-section">
              <h2>Signals</h2>
              <div className="chart-container">
                <Plot
                  data={[
                    {
                      x: signals.x,
                      y: signals.y,
                      type: "scatter",
                      mode: "lines",
                      line: { color: "#1a5e7d" },
                      name: "EEG Signal",
                    },
                  ]}
                  layout={{
                    title: "EEG Signal",
                    xaxis: { title: "Time (s)" },
                    yaxis: { title: "Amplitude (µV)" },
                    showlegend: true,
                    height: 500,
                    margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
                    hovermode: "x unified",
                  }}
                  config={{
                    responsive: true,
                    scrollZoom: true, // Activer le zoom avec la molette
                  }}
                />
              </div>

              {/* Informations supplémentaires */}
              <div className="signal-info">
                <div className="info-card">
                  <h3>Max Amplitude</h3>
                  <p>{Math.max(...signals.y).toFixed(2)} µV</p>
                </div>
                <div className="info-card">
                  <h3>Min Amplitude</h3>
                  <p>{Math.min(...signals.y).toFixed(2)} µV</p>
                </div>
                <div className="info-card">
                  <h3>Mean Amplitude</h3>
                  <p>{(signals.y.reduce((a, b) => a + b, 0) / signals.y.length).toFixed(2)} µV</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;