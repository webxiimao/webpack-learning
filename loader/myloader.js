/*
 * @Author: maoyuyu
 * @Date: 2020-03-30 13:57:55
 * @LastEditors: maoyuyu
 * @LastEditTime: 2020-04-18 14:20:30
 * @Description: 
 */


const {
  getOptions
} = require("loader-utils")
const parser = require("@babel/parser")
const traverse = require("babel-traverse").default;
const t = require("babel-types")
const generate = require("@babel/generator").default

module.exports = function (code) {
  
  const options = getOptions(this);

  const ast = parser.parse(code,{
    sourceType:"module",
    plugins:["jsx"]
  });
  
  traverse(ast,{
    JSXText:{
      exit(path){
        const node = path.node
        path.replaceWith(t.stringLiteral(node.value))
      }
    },
    JSXElement:{
      exit(path){
        const node = path.node
        const openingElement = node.openingElement
        path.replaceWith(t.callExpression(t.Identifier("render"),[
          t.stringLiteral(openingElement.name.name),
          t.objectExpression(openingElement.attributes.map(attr => {
            return t.objectProperty(t.stringLiteral(attr.name.name), t.stringLiteral(attr.value.value))
          })),
          t.arrayExpression(node.children),
        ]))
      }
    }
  })
  return generate(ast).code
}