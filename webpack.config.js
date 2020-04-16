/*
 * @Author: maoyuyu
 * @Date: 2020-03-30 13:46:03
 * @LastEditors: maoyuyu
 * @LastEditTime: 2020-03-30 15:09:05
 * @Description: 
 */
const path = require("path")
 module.exports = {
   entry:path.join(__dirname, "src", "main.jsx"),
   mode:"development",
   output:{
     publicPath:"dist",
     filename:"main.js"
   },
   module:{
     rules:[
       {
         test:/\.jsx$/,
          use:{
            loader:path.join(__dirname, "loader", "myloader.js"),
            options:{
              name:"myloader"
            }
          }
       },

     ]
   }
 }
