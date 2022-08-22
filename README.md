# Getting Started with Transfer Solution Project

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Notes

1. This project focuses on the front-end implementation. It uses the `coding-challenge.ts` file as its sole backend database. That means `CRUD` operations on nodes and edges do not perform as normal DB operations, i.e. data does not preserve after refreshing the browser. Once refreshing the browser, the nodes and edges will reverse to the original data from `coding-challenge.ts`. 

2. You can use two-finger mouse gesture to zoom in and out of the graph. You can also click and hold to drag the graph to move to different positions. 

3. For each node, you can click to view its information and edit it. For each edge, you can hover to view its information. You can also click the edge to open the drawer and edit it.

4. There is a `Create Transfer` button at the top left corner of the screen. You can create a transfer by clicking it. 