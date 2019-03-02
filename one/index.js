/*
* 爬取one页面
* */
const request = require('superagent'); //发送网络请求获取DOM
const cheerio = require('cheerio'); //能够像Jquery一样方便获取DOM节点

const OneUrl = "http://wufazhuce.com/", //ONE的web版网站
      WeatherUrl = "https://tianqi.moji.com/weather/china/" + "anhui/tongling";

module.exports.getText =  new Promise(resolve => {
    request.get(OneUrl).end(function(err,res){
        if(err){
            console.log(err);
        }
        let $ = cheerio.load(res.text);let selectItem=$('#carousel-one .carousel-inner .item');
        let todayOne = selectItem[0]; //获取轮播图第一个页面，也就是当天更新的内容
        let todayOneData = {  //保存到一个json中
            imgUrl:$(todayOne).find('.fp-one-imagen').attr('src'),
            type:$(todayOne).find('.fp-one-imagen-footer').text().replace(/(^\s*)|(\s*$)/g, ""),
            text:$(todayOne).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
        };
        resolve(todayOneData)
    });
});

module.exports.getWeatherData = new Promise(resolve => {
    // 获取天气预报
     request.get(WeatherUrl).end(function(err, res) {

        let threeDaysData = [],weatherTip = "";
        let $ = cheerio.load(res.text);
        $(".wea_tips").each(function(i, elem) {
            weatherTip = $(elem)
                .find("em")
                .text();
        });
        $(".forecast .days").each(function(i, elem) {
                const SingleDay = $(elem).find("li");
                threeDaysData.push({
                    Day: $(SingleDay[0])
                        .text()
                        .replace(/(^\s*)|(\s*$)/g, ""),
                    WeatherImgUrl: $(SingleDay[1])
                        .find("img")
                        .attr("src"),
                    WeatherText: $(SingleDay[1])
                        .text()
                        .replace(/(^\s*)|(\s*$)/g, ""),
                    Temperature: $(SingleDay[2])
                        .text()
                        .replace(/(^\s*)|(\s*$)/g, ""),
                    WindDirection: $(SingleDay[3])
                        .find("em")
                        .text()
                        .replace(/(^\s*)|(\s*$)/g, ""),
                    WindLevel: $(SingleDay[3])
                        .find("b")
                        .text()
                        .replace(/(^\s*)|(\s*$)/g, ""),
                    Pollution: $(SingleDay[4])
                        .text()
                        .replace(/(^\s*)|(\s*$)/g, ""),
                    PollutionLevel: $(SingleDay[4])
                        .find("strong")
                        .attr("class")
                });
        });
         resolve({threeDaysData,weatherTip})
    });
});
