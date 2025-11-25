

import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';


function App() {
  return (
    <div className="App bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 shadow">
        <div className="container-fluid d-flex align-items-center">
          <NavLink className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img src={process.env.PUBLIC_URL + '/octofitapp-small.png'} alt="Octofit Logo" className="App-logo me-2" />
            Octofit Tracker
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={
            <div className="text-center mt-5">
              <h1 className="display-4 fw-bold mb-3">Welcome to Octofit Tracker!</h1>
              <p className="lead">Track your fitness, join teams, and compete on the leaderboard.</p>
              <NavLink to="/activities" className="btn btn-primary btn-lg mt-3">Get Started</NavLink>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
