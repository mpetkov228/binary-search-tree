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

}

let tree = new Tree([1, 3, 7, 9]);

console.log(tree.root);

prettyPrint(tree.root);

tree.insert(2);

prettyPrint(tree.root);














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