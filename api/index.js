const express = require('express');
const fs = require('fs')
const dotenv = require('dotenv');
const cors = require('cors');
const ClashApiService = require('./src/clash-api-service')
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

const clashApiService = new ClashApiService();

app.use('/warLog', async (req, res) => {

  try {
   const members = await clashApiService.getMemberList();
  //  const warLog = await clashApiService.getWarLog();
  //  stars
  //  attacks
  //  missed
  //  destruction

  // put to link with war log after have this data. just a mock to test the front end - sort by stars and destruction
    const membersWarInfo = members.map((member) => {
      // remember to put default values '-'
      return {
        name: member.name,
        stars: 0,
        attacks: 0,
        missed: 0,
        destruction:0,
        townHallLevel: member.townHallLevel,
      };
    });
  
    res.status(200).send({membersWarInfo});
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
  }
});

app.listen(PORT,'127.0.0.1', () => {
  console.log(`server listening on port ${PORT}`);
});
