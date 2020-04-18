const render = (tag, attr, children) => {
  const element = document.createElement(tag)
  for(let key in attr){
    element.setAttribute(key, attr[key])
  }
  if(typeof children === 'undefined'){
    return element
  }
  if(typeof children === "string"){
    element.appendChild(document.createTextNode(children))
  }else{
    for(let ele of children){
      if(typeof ele === "string"){
        ele = document.createTextNode(ele)
      }
      element.appendChild(ele)
    }
  }
  return element
}


class ASTrender {
  render(){
    return <div class="father" sss="sss">hello babel, my name is <span class="red">xii</span></div>
  }
}

const component = new ASTrender()
document.getElementById('app').appendChild(component.render())



 