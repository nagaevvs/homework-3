const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const http = require("http");
const { config } = require("./config.js");

const myAPIKey = config.myAPIKey;
const baseUrl = config.host;

const rl = readline.createInterface({ input, output });

rl.question(
  `Введите название города, для которого требуется вывести прогноз.\n`,
  (sity) => {
    const url = `${baseUrl}current?access_key=${myAPIKey}&query=${sity}`;
    http
      .get(url, (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          console.log(statusCode);
          return;
        }

        res.setEncoding("utf8");
        let rowData = "";
        res.on("data", (chunk) => (rowData += chunk));
        res.on("end", () => {
          const parseData = JSON.parse(rowData);
          console.log(parseData);
          console.log(`Загружен массив даннымх по запросу "${sity}" `);
          rl.close();
        });
      })
      .on("error", (err) => {
        console.error(err);
        rl.close();
      });
  }
);

rl.on("close", () => {
  console.log(`До новых встреч!`);
});
