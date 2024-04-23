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
        <div className="subtext">Ultimas: 3 Guerras e 2 ligas (vou aumentar qnd for coletando mais dados)</div>
      </div>


      <div className="playerslist">
        <div className="table">
          <div>#</div>

          <div>Nick</div>

          <div>Estrelas</div>

          <div>Ataques</div>

          <div>
            Attacks perdidos
          </div>

          <div>
            destruição %
          </div>

          <div>
            CV
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
