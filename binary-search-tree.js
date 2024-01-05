class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(this.array);
    }

    buildTree(data, start = 0, end = data.length - 1) {
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let node = new Node(data[mid]);

        node.left = this.buildTree(data, start, mid - 1);
        node.right = this.buildTree(data, mid + 1, end);
        
        return node;
    }

    insert(value, node = this.root) {
        if (node == null) {
            node = new Node(value);
            return node;
        }

        if (node.data > value) {
            node.left = this.insert(value, node.left);
        } else if (node.data < value) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    delete(value, node = this.root) {
        // base case
        if (node == null) {
            return node;
        }

        // tree traversal
        if (node.data > value) {
            node.left = this.delete(value, node.left);
            return node;
        } else if (node.data < value) {
            node.right = this.delete(value, node.right);
            return node;
        }


        if (node.left == null) {
            // if node has only right child
            let temp = node.right;
            node = null;
            return temp;
        } else if (node.right == null) {
            // if node has only left child
            let temp = node.left;
            node = null;
            return temp;
        } else {
            // if node has two children
            let successorParent = node;

            let successor = node.right;
            while (successor.left != null) {
                successorParent = successor;
                successor = successor.left;
            }

            if (successorParent !== node) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }

            node.data = successor.data;

            successor = null;
            return node;
        }   
    }

    find(value, node = this.root) {
        if (node == null) {
            return null;
        }

        if (node.data > value) {
            return this.find(value, node.left);
        } else if (node.data < value) {
            return this.find(value, node.right);
        }

        return node;
    }

    levelOrder(cb) {
        let array = [];
        let q = [this.root];

        while (q.length != 0) {
            let node = q.shift();
            if (node == null) {
                continue;
            }
            q.push(node.left);
            q.push(node.right);

            if (cb) {
                cb(node);
            } else {
                array.push(node.data);
            }
        }

        if (!cb) {
            return array;
        }

        return this.root;
    }

    preOrder(cb, arr = [], node = this.root) {
        if (node == null) {
            return;
        }

        if (!cb) {
            arr.push(node.data);
        } else {
            cb(node);
        }

        this.preOrder(cb, arr, node.left);
        this.preOrder(cb, arr, node.right);

        return arr;
    }

    inOrder(cb, arr = [], node = this.root) {
        if (node == null) {
            return;
        }

        this.inOrder(cb, arr, node.left);

        if (!cb) {
            arr.push(node.data);
        } else {
            cb(node);
        }

        this.inOrder(cb, arr, node.right);

        return arr;
    }

    postOrder(cb, arr = [], node = this.root) {
        if (node == null) {
            return;
        }

        this.postOrder(cb, arr, node.left);
        this.postOrder(cb, arr, node.right);

        if (!cb) {
            arr.push(node.data);
        } else {
            cb(node);
        }

        return arr;
    }

    height(node) {
        if (node == null) {
            return 0;
        }
        if (!node.left && !node.right) {
            return 0;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

       return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, tree = this.root) {
        
        if (node.data < tree.data) {
            return 1 + this.depth(node, tree.left);
        }
        
        if (node.data > tree.data) {
            return 1 + this.depth(node, tree.right);
        }
        
        return 0;
    }

    isBalanced() {
        let leftHeight = this.height(this.root.left);
        let rightHeight = this.height(this.root.right);

        return Math.abs(leftHeight - rightHeight) <= 1;
    }

    rebalance() {
        let sortedArray = this.inOrder();
        this.root = this.buildTree(sortedArray);
    }
}

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node == null) {
        return;
    }

    if (node.right != null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left != null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

let tree = new Tree([1, 2, 3, 7, 9, 11, 13, 15]);

prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.insert(16);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());