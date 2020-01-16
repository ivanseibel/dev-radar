import React from 'react';

import './styles.css';

function DevItem({ dev, handleDeleteDev }) {

  async function handleDelete(e) {
    e.preventDefault();

    if (window.confirm('Confirm the deletion?')) {
      handleDeleteDev(dev.github_username);
    }
  }

  return (
    <li className="dev-item">
      <div className="container card">
        <header>
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
          </div>
        </header>

        <div className="container content">
          <p>{dev.bio}</p>
        </div>

        <section className="container flex">
          <div className="item flex-item-1">
            <a href={`https://github.com/${dev.github_username}`}>Access Github profile</a>
          </div>
          <div className="item flex-item-1" id="actionButtons">
            <i className="material-icons">edit</i>
            <span href="#" onClick={handleDelete}><i className="material-icons">delete</i></span>
          </div>
        </section>
      </div>

    </li>
  );
}

export default DevItem;