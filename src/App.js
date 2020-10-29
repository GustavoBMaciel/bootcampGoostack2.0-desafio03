import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get("repositories");
      setProjects([...response.data]);
    }
    loadProjects();
  }, []);

  async function handleAddRepository() {
    const newRository = {
      title: `New Repository ${Date.now()}`,
    };

    const response = await api.post("repositories", newRository);

    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const newProjects = projects.filter((items) => items.id !== id);
      setProjects(newProjects);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
