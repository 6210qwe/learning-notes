const express = require('express');
const app = express();
const get_anti = require("./5");
// // const antigain = require("./pdd_0ar");
// var bodyParser = require('body-parser');
// app.use(bodyParser());
// const Buffer = require('buffer').Buffer;

// console.log(get_anti)
// app.get('/pdd_0ap', function (req, res) {
//     let jsStr = req.body.jsStr;
//     get_anti.get_anti()
//       .then(result => {
//             console.log(result);
//             res.send(result);
//         })
//       .catch(err => {
//             console.error(err);
//             res.status(500).send('异步操作出现错误');
//         });
// });


app.listen(3005, () => {
    console.log("开启服务，端口 3005")
});
