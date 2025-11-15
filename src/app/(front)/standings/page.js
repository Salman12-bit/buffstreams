"use client";

import { useState, useEffect } from "react";
import "./standings.css";

export default function CricketPage() {
  
  const [standings, setStandings] = useState(() => {
    const saved = localStorage.getItem("standings");
    return saved
      ? JSON.parse(saved)
      : [
        { id: 1, team: "India", played: 5, won: 4, lost: 1, points: 8 },
        { id: 2, team: "Australia", played: 5, won: 3, lost: 2, points: 6 },
        { id: 3, team: "England", played: 5, won: 2, lost: 3, points: 4 },
        { id: 4, team: "Pakistan", played: 5, won: 1, lost: 4, points: 2 },
      ];
  });

  const [newTeam, setNewTeam] = useState({
    team: "",
    played: "",
    won: "",
    lost: "",
    points: "",
  });

  // Save standings to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("standings", JSON.stringify(standings));
  }, [standings]);

  const handleChange = (e) => {
    setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
  };

  const handleAddTeam = () => {
    if (!newTeam.team) return alert("Please enter team name");
    const newEntry = {
      id: standings.length + 1,
      team: newTeam.team,
      played: Number(newTeam.played || 0),
      won: Number(newTeam.won || 0),
      lost: Number(newTeam.lost || 0),
      points: Number(newTeam.points || 0),
    };
    setStandings([...standings, newEntry]);
    setNewTeam({ team: "", played: "", won: "", lost: "", points: "" });
  };

  const handleDelete = (id) => {
    setStandings(standings.filter((t) => t.id !== id));
  };

  return (
    <section className="standings-page">
      <h2 className="page-title">🏏 Cricket Team Standings</h2>

      <div className="add-team-form">
        <input
          type="text"
          name="team"
          placeholder="Team Name"
          value={newTeam.team}
          onChange={handleChange}
        />
        <input
          type="number"
          name="played"
          placeholder="Played"
          value={newTeam.played}
          onChange={handleChange}
        />
        <input
          type="number"
          name="won"
          placeholder="Won"
          value={newTeam.won}
          onChange={handleChange}
        />
        <input
          type="number"
          name="lost"
          placeholder="Lost"
          value={newTeam.lost}
          onChange={handleChange}
        />
        <input
          type="number"
          name="points"
          placeholder="Points"
          value={newTeam.points}
          onChange={handleChange}
        />
        <button onClick={handleAddTeam}>Add Team</button>
      </div>

      <table className="standings-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.id}>
              <td>{team.team}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.lost}</td>
              <td>{team.points}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(team.id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
