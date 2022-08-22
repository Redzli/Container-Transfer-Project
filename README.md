# Getting Started with Transfer Solution Project

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Notes

1. This project focuses on the front-end implementation. It uses the `coding-challenge.ts` file as its sole backend database. That means `CRUD` operations on nodes and edges do not perform as normal DB operations, i.e. data does not preserve after refreshing the browser. Once refreshing the browser, the nodes and edges will reverse to the original data from `coding-challenge.ts`. Also, when creating a new transfer, the ID is randomly generated.

2. You can use two-finger mouse gesture to zoom in and out of the graph. You can also click and hold anywhere on the graph to move to different positions. 

3. For each node, you can click to view its information and edit it. For each edge, you can hover to view its information. You can also click the edge to open the drawer and edit it.

4. There is a `Create Transfer` button at the top left corner of the screen. You can create a transfer by clicking it. 

5. In the codebase, there are several places where I used `@ts-ignore`. I know one should always avoid such hacking as it defeats the purpose of using `Typescript`. However, due to the strict time constraint on completing this project, I had to hack some type definitions. If more time is allowed, I will definitely remove all the `@ts-ignore`. 

6. I noticed that some components such as `transfer-tooltip` and `transfer-info-drawer` share many common characteristics. They can definitely be better encapsulated and wrapped into a global component. I would like to make that as a TO-DO for improving this project.