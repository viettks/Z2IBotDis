import { db } from "./connect.js";

const bossList = [
  { name: "SK", level: "1", sort: "1" },
  { name: "K", level: "1", sort: "2" },
  { name: "WH", level: "1", sort: "3" },
  { name: "F", level: "2", sort: "1" },
  { name: "DO", level: "2", sort: "2" },
  { name: "2SP", level: "2", sort: "3" },
  { name: "WA", level: "2", sort: "4" },
  { name: "SL", level: "3", sort: "1" },
  { name: "AN", level: "3", sort: "2" },
  { name: "SP", level: "3", sort: "3" },
  { name: "WW", level: "3", sort: "4" },
  { name: "DR", level: "3", sort: "5" },
  { name: "NHAMA", level: "3", sort: "6" },
];

export const set_boss = async (name, position) => {
  console.log(name, position);
  let now = new Date();
  let date =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  let time = now.getHours();
  let type = "morning";
  if (time >= 12) {
    type = "afternoon";
  }
  let duplicate = await get_boss_with_date(name, position, date, type);
  if (duplicate) {
    return "Boss already set";
  } else {
    return await create(name, position, date, type);
  }
};

export const remove_boss = async (name, position) => {
  console.log(name, position);
  let now = new Date();
  let date =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  let time = now.getHours();
  let type = "morning";
  if (time >= 12) {
    type = "afternoon";
  }

  return await remove(name, position, date, type);
};

export const get_boss = async () => {
  let now = new Date();
  let date =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  let time = now.getHours();
  let type = "morning";
  if (time >= 12) {
    type = "afternoon";
  }

  var listBoss = await getBoss(date, type);

  var sk = [];
  var k = [];
  var wh = [];
  var f = [];
  var doo = [];
  var sp2 = [];
  var wa = [];
  var sl = [];
  var an = [];
  var sp = [];
  var ww = [];
  var dr = [];
  var nhama = [];
  for (let boss of listBoss) {
    let position = boss.position;
    if (boss.name === "SK") {
      sk.push("(" + position + ")");
      continue;
    }
    if (boss.name === "K") {
      k.push("(" + position + ")");
      continue;
    }
    if (boss.name === "WH") {
      wh.push("(" + position + ")");
      continue;
    }
    if (boss.name === "F") {
      f.push("(" + position + ")");
      continue;
    }
    if (boss.name === "DO") {
      doo.push("(" + position + ")");
      continue;
    }
    if (boss.name === "SP") {
      sp.push("(" + position + ")");
      continue;
    }
    if (boss.name === "WA") {
      wa.push("(" + position + ")");
      continue;
    }
    if (boss.name === "SL") {
      sl.push("(" + position + ")");
      continue;
    }
    if (boss.name === "AN") {
      an.push("(" + position + ")");
      continue;
    }
    if (boss.name === "2SP") {
      sp2.push("(" + position + ")");
      continue;
    }
    if (boss.name === "WW") {
      ww.push("(" + position + ")");
      continue;
    }
    if (boss.name === "DR") {
      dr.push("(" + position + ")");
      continue;
    }
    if (boss.name === "NHAMA") {
      nhama.push("(" + position + ")");
      continue;
    }
  }

  var typeName = "Buổi sáng";
  if (type !== "morning") {
    typeName = "Buổi chiều";
  }

  var response = `
  Today's boss map: ${date} 🏴‍☠️(${typeName})
  Boss 💀:
    • Coordinates SK: ${sk.join(", ")}
    • Coordinates K: ${k.join(", ")}
    • Coordinates WH: ${wh.join(", ")}
    Boss 💀💀:
    • Coordinates F: ${f.join(", ")}
    • Coordinates DO: ${doo.join(", ")}
    • Coordinates SP:  ${sp2.join(", ")}
    • Coordinates WA: ${wa.join(", ")}
    Boss 💀💀💀:
    • Coordinates SL: ${sl.join(", ")}
    • Coordinates AN: ${an.join(", ")}
    • Coordinates SP: ${sp.join(", ")}
    • Coordinates WW: ${ww.join(", ")}
    • Coordinates DR: ${dr.join(", ")}
    • Coordinates NHAMA: ${nhama.join(", ")}
    `;
  return response;
};

const get_boss_with_date = async (name, position, date, type) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM postion WHERE name = ? AND position = ? AND date = ? AND type = ?`,
      [name, position, date, type],
      (err, row) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        }
        resolve(row);
      }
    );
  });
};

const create = async (name, position, date, type) => {
  for (let option of bossList) {
    if (option.name === name) {
      var boss = option;
    }
  }

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO postion (name, position, date,type, level,sort) VALUES ('${name}', '${position}', '${date}','${type}','${boss.level}', '${boss.sort}')`,
      (err) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        }
        resolve(`Set ${name} to ${position} on ${date} ${type}`);
      }
    );
  });
};

const remove = async (name, position, date, type) => {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM postion WHERE name = ? AND position = ? AND date = ? AND type = ?`,
      [name, position, date, type],
      (err) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        }
        resolve(`Xóa ${name} at ${position}`);
      }
    );
  });
};

const getBoss = async (date, type) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM postion WHERE date = ? AND type = ? ORDER BY level ASC, sort ASC`,
      [date, type],
      (err, rows) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        }
        resolve(rows);
      }
    );
  });
};
