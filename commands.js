import "dotenv/config";
import { getRPSChoices } from "./game.js";
import { capitalize, InstallGlobalCommands } from "./utils.js";
import * as boss from "./boss.js";

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

function bossChoices() {
  var arr = [
    { name: "SK", value: "SK" },
    { name: "K", value: "K" },
    { name: "WH", value: "WH" },
    { name: "F", value: "F" },
    { name: "DO", value: "DO" },
    { name: "2SP", value: "2SP" },
    { name: "WA", value: "WA" },
    { name: "SL", value: "SL" },
    { name: "AN", value: "AN" },
    { name: "SP", value: "SP" },
    { name: "WW", value: "WW" },
    { name: "DR", value: "DR" },
    { name: "DF", value: "DF" },
    { name: "4SL", value: "4SL" },
    { name: "NHAMA", value: "NHAMA" },
  ];
  return arr;
}

function setBoss() {
  return "OK";
}

function getBoss(name) {
  return boss.getBoss(name);
}

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: "challenge",
  description: "Challenge to a match of rock paper scissors",
  options: [
    {
      type: 3,
      name: "object",
      description: "Pick your object",
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

const SET_BOSS_COMMAND = {
  name: "set_boss",
  description: "Set boss for the server",
  options: [
    {
      type: 3,
      name: "name",
      description: "Tên boss",
      required: true,
      choices: bossChoices(),
    },
    {
      type: 3,
      name: "position",
      description: "Tọa độ của boss",
      required: true,
    },
  ],
};

const REMOVE_BOSS_COMMAND = {
  name: "remove_boss",
  description: "REMOVE boss for the server",
  options: [
    {
      type: 3,
      name: "name",
      description: "Tên boss",
      required: true,
      choices: bossChoices(),
    },
    {
      type: 3,
      name: "position",
      description: "Tọa độ của boss",
      required: true,
    },
  ],
};

const GET_BOSS_COMMAND = {
  name: "boss",
  description: "Get boss for the server",
  options: []
};

const ALL_COMMANDS = [
  TEST_COMMAND,
  CHALLENGE_COMMAND,
  SET_BOSS_COMMAND,
  REMOVE_BOSS_COMMAND,
  GET_BOSS_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
