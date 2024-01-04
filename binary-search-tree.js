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

let tree = new Tree([1, 2, 3, 7, 9, 11, 15, 13]);

prettyPrint(tree.root);
tree.delete(7);
prettyPrint(tree.root);
