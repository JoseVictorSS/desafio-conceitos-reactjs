import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Titulo ${Date.now()}`,
	    url: "http://teste.com.br",
	    techs: [ "tec 1", "tec 2"]
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    repositories.splice(repositories.findIndex(r => r.id === id), 1);

    setRepositories([ ...repositories ]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => 
        
          <li key={repository.id}>
            
            <h1>{repository.title}</h1>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

          </li>)

        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
