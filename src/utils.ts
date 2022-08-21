export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
