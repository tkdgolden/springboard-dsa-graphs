class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.map(vertex => this.nodes.add(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node in this.nodes) {
      node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen = [start.value]) {
    for (let neighbor of start.adjacent) {
      if (!seen.includes(neighbor.value)) {
        seen.push(neighbor.value);
        this.depthFirstSearch(neighbor, seen);
      }
    }
    return seen;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start, seen = [start.value], toDo = []) {
    for (let neighbor of start.adjacent) {
      if (!seen.includes(neighbor.value)) {
        seen.push(neighbor.value);
        if (!toDo.includes(neighbor)) {
          toDo.unshift(neighbor);
        }
      }
    }
    while (toDo.length > 0) {
      this.breadthFirstSearch(toDo.pop(), seen, toDo);
    }
    return seen;
  }
}

module.exports = {Graph, Node}