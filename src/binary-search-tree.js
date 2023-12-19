const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode === null) {
      this.rootNode = new Node(data);
      return;
    }
    let currentNode = this.rootNode;
    while (currentNode) {
      if (data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(data);
          return;
        }
        else {
          currentNode = currentNode.left;
        }
      }
      else {
        if (currentNode.right === null) {
          currentNode.right = new Node(data);
          return;
        }
        else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      }
      if (data < currentNode.data) {
        //console.log(`${data} < ${currentNode.value}`);
        currentNode = currentNode.left;
      }
      else{
        //console.log(`${data} > ${currentNode.value}`);
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);
    function removeNode(currentNode, data) {
      if (!currentNode === null) {
        return null;
      }
      while (currentNode) {
        if (data < currentNode.data) {
          currentNode.left = removeNode(currentNode.left, data);
          return currentNode;
        }
        else if (data > currentNode.data) {
          currentNode.right = removeNode(currentNode.right, data);
          return currentNode;
        } 
        else {
          if (currentNode.left === null && currentNode.right === null) {
            return null;
          }
          else if (currentNode.left === null && currentNode.right !== null) {
            currentNode = currentNode.right;
            return currentNode;
          }
          else if (currentNode.right === null && currentNode.left !== null){
            currentNode = currentNode.left;
            return currentNode;
          }
          else{
            let minNode = currentNode.right;
            if (minNode === null) {
              return null;
            } 
            while (minNode.left !== null){
              minNode = minNode.left;
            }
            currentNode.data = minNode.data;
            currentNode.right = removeNode(currentNode.right, minNode.data);
            return currentNode;
          }
        }
        return currentNode;
      }
    }
  }

  min() {
    if (this.rootNode === null) {
      return null;
    } 
    let currentNode = this.rootNode;
    while (currentNode.left !== null){
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    } 
    let currentNode = this.rootNode;
    while (currentNode.right !== null){
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};