import React, { useEffect, useState } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDeleteDev(github_username) {
    await api.delete(`/devs/${github_username}`);

    const newDevsList = devs.filter(function (value, index, arr) {
      return value.github_username !== github_username;
    });

    setDevs(newDevsList);

  }

  return (
    <div id="app">

      <aside>
        <strong>Register</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} handleDeleteDev={handleDeleteDev} />
          ))}
        </ul>
      </main>

    </div >
  );
}

export default App;