let stateTree = (state, node, $sp) => {
  if (node == undefined || node.length == 0) return;
  node.forEach(node => {
    let new_state = state + ((state === '') ? '' : '.') + node.name
    $sp.state(new_state, node)
    stateTree(new_state, node.childrens, $sp)
  });
}

let toTitleBar = (str) => {
  if (str.length <= 10) return str
  return str.substr(0, 7) + "..."
}