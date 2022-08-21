import React from "react";

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const GraphConfig = {
  NodeTypes: {
    empty: {
      // typeText: "Container",
      shapeId: "#empty",
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      ),
    },
    custom: {
      typeText: "Custom",
      shapeId: "#custom", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 50 25" id="custom" key="0">
          <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
        </symbol>
      ),
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      // required to show empty edges
      shapeId: "#emptyEdge",
      shape: <symbol viewBox="0 0 50 50" id="emptyEdge" key="0"></symbol>,
    },
  },
};

// export function isDrag() {
//   const delta = 6;
//   let startX: number;
//   let startY: number;

//   let flag = false;

//   document.addEventListener("mousedown", function (event: any) {
//     startX = event.pageX;
//     startY = event.pageY;
//   });

//   document.addEventListener("mouseup", function (event) {
//     const diffX = Math.abs(event.pageX - startX);
//     const diffY = Math.abs(event.pageY - startY);

//     console.log("diffX", diffX, diffY);

//     if (diffX < delta && diffY < delta) {
//       // Click!
//       flag = true;
//     }
//   });
//   console.log("what is drag", !flag ? "drag" : "click");
//   return flag;
// }

export function isDrag() {
  let drag = false;

  document.addEventListener("mousedown", () => (drag = false));
  document.addEventListener("mousemove", () => (drag = true));
  document.addEventListener("mouseup", () =>
    console.log(drag ? "drag" : "click")
  );

  console.log("what is drag", drag ? "drag" : "click");
  return drag;
}
