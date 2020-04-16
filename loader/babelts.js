/*
 * @Author: maoyuyu
 * @Date: 2020-03-30 17:25:38
 * @LastEditors: maoyuyu
 * @LastEditTime: 2020-04-16 17:55:26
 * @Description: 
 */

const {
  getOptions
} = require("loader-utils")
const fs = require("fs")
const parser = require("@babel/parser")
const traverse = require("babel-traverse").default;
const t = require("babel-types")
const generate = require("@babel/generator").default

const code = `class ASTrender {
  render(){
    return <div>hello babel, my name is <span class="red">xii</span></div>
  }
}`

const ast = parser.parse(code,{
  sourceType:"module",
  plugins:["jsx"]
});


// render("div",{

// },[
//   "11111111",
//   render("span",{
//     class:"red"
//   },"22222222")
// ])

traverse(ast,{
  JSXText:{
    exit(path){
      const node = path.node
      path.replaceWith(t.stringLiteral(node.value))
    }
  },
  JSXElement:{
    exit(path){
      // console.log("exit",path);
      // t.assertCallExpression(path.node,{
        
      // })
      
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
console.log(generate(ast));


