const nodemailer = require('nodemailer'); //发送邮件的node插件
const {HTMLDATA} = require("./temEjs/app");

let transporter = nodemailer.createTransport({
    service: 'smtp.163.com', // 发送者的邮箱厂商
    port: 465, // 端口
    sercure: true,
    auth: {   //发送者的账户密码
        user: 'tlsurenjun@163.coom', //账户
        pass: '******', //smtp授权码，到邮箱设置下获取
    }
});

HTMLDATA
    .then(HtmlData  =>{//所有数据汇总
        return {
            from: 'tlsurenjun@163.com>', // 发送者昵称和地址
            to: '1003918176@qq.coom', // 接收者的邮箱地址
            subject: '一封暖暖的小邮件', // 邮件主题
            html: HtmlData  //也可以用html发送
        }})
    .then(mailOptions =>{
        //发送邮件
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('邮件发送成功 ID：', info.messageId);
        });
    });
