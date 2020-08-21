const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const playerTemplate = { id: null, name: null, money: 0, stocks: [] };
const buyOrderTemplate = { playerName: null, price: 0 };

const stocks = { peen: { name: "peen", sells: [buyOrderTemplate], buys: [] } };

const players = {};

const app = express();

app.use(cors({ preflightContinue: true, credentials: true }));

app.use(cookieParser());

app.get("/getstocks", (req, res) => {
  res.send(Object.values(stocks));
});

app.get("/getplayer", (req, res) => {
  // ONLY FOR CORS
  res.set("Access-Control-Allow-Origin", "http://localhost:3000")
  const player = players[req.cookies.id];
  if (player) res.send(player);
  else res.send(false);
});

app.get("/createplayer", function (req, res) {
  let newPlayer = playerTemplate;
  newPlayer.name = req.query.name;
  newPlayer.id = uuidv4();
  players[newPlayer.id] = newPlayer;
  res.send(newPlayer);
});

app.listen(3001, () => {
  console.log("Hosted and listening on 3001");
});
