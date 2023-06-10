const fs = require('fs')
const fastify = require('fastify')()
const { coinCount, coins } = require("./p3-module")

fastify.get("/", (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
      if (err) {
        console.log(err);
        reply
          .code(500)
          .header("Content-Type", "text/html; charset=utf-8")
          .send("<h1>Error Processing your Request!</h1>");
      } else {
        reply
          .code(200)
          .header("Content-Type", "text/html; charset=utf-8")
          .send(data);
      }
    });
})

fastify.get("/coin", (request, reply) => {
    const { denom = 0, count = 0 } = request.query
    const denomInt = parseInt(denom)
    const countInt = parseInt(count)
    coinValue = coinCount({denom, count})

    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
})

fastify.get("/coins", (request, reply) => {
    const { option } = request.query
    let coinValue = 0
    switch (parseInt(option)) {
      case 1:
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }); // option = 1
        break;
      case 2:
        coinValue = coinCount(...coins); // option = 2
        break;
      case 3:
        coinValue = coinCount(coins); // Extra credit: option = 3
        break;
      default:
        coinValue = 0;
    }
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
})

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

// :)

