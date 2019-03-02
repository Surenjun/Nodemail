const ejs = require('ejs'); //ejs模版引擎
const fs  = require('fs'); //文件读写
const path = require('path'); //路径配置

const {getText,getWeatherData} = require("../one/index");

let HtmlData = {};
let today = new Date();
let todaystr =
    today.getFullYear() +
    " / " +
    (today.getMonth() + 1) +
    " / " +
    today.getDate();

module.exports.HTMLDATA = Promise.all([getText,getWeatherData]).then(
    function(data){
        HtmlData["todayOneData"] = data[0];
        HtmlData["weatherTip"] = data[1]["weatherTip"];
        HtmlData["threeDaysData"] = data[1]["threeDaysData"];
        return template(HtmlData);
    }
).catch(function(err){
    console.log('获取数据失败： ',err);
});

//将目录下的mail.ejs获取到，得到一个模版
const template = ejs.compile( fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8') );


