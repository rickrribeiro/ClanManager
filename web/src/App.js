import './App.css';

import React, { useState } from "react";
import ReactDOM from "react-dom";
import ClashApiService from './services/clash-api-service';
const clashApiService = new ClashApiService();

const App = () => {
  const [members, setMembers] = useState([]);
  clashApiService.getClanWarLog().then((data) => setMembers(data));
  // depois internacionalizar os textos botando ingles ou portugues
  return (
    <div className="container">

      <div className="topHeaderList">

        <div className="clanName">A rua é noiz</div>
        <div className="subtext">Last 3 Wars and 2 leagues</div>
      </div>


      <div className="playerslist">
        <div className="table">
          <div>#</div>

          <div>Nick</div>

          <div>Stars</div>

          <div>Attacks</div>

          <div>
            Missed Attacks
          </div>

          <div>
            destruction average %
          </div>

          <div>
            TH
          </div>

        </div>
        <div className="list">
          {members?.map((member, index) => (
            <div className="player" key={index}>
              <span> {index + 1}</span>
              <div className="user">
                <span> {member.name} </span>
              </div>
              <span> {(member.stars)} </span>
              <span> {(member.attacks)} </span>
              <span> {(member.missed)} </span>
              <span> {(member.destruction)} </span>
              <span> {member.townHallLevel} </span>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById("root"))

export default App;
