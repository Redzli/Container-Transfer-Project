export const TRANSFER_MOCK = [
  {
    id: 23,
    destination_container_id: 13,
    source_container_id: 26,
  },
  {
    id: 22,
    destination_container_id: 26,
    source_container_id: 13,
  },
];

export const CONTAINER_MOCK = [
  {
    operator_note: "Q-production A1",
    container_type_id: 2,
    solution_name: "Production medium",
    solution_initial_volume_mL: null,
    inventory_location: "ferm-4th floor",
    id: 13,
    solution_description: null,
  },
  {
    operator_note: "0h-A1",
    container_type_id: 4,
    solution_name: null,
    solution_initial_volume_mL: 5,
    inventory_location: "fridge",
    id: 26,
    solution_description: null,
  },
];

// const convertContainerToNotes = () => {
//   CONTAINER_MOCK.map(container => {
//     return {
//       i
//     }
//   })
// }

// export const linkContainer = () => {
//   const data = TRANSFER_MOCK.map((transfer) => {
//     const sourceId = transfer.source_container_id;
//     const destinationId = transfer.destination_container_id;
//     const sourceContainer = CONTAINER_MOCK.filter(
//       (container) => container.id === sourceId
//     );
//     const destinationContainer = CONTAINER_MOCK.filter(
//       (container) => container.id === destinationId
//     );
//     return {
//       name: `id: ${sourceContainer[0].id}`,
//       attributes: { "solution name": sourceContainer[0].solution_name },
//       children: {
//         name: `id: ${destinationId}`,
//         attributes: { "solution name": destinationContainer[0].solution_name },
//       },
//     };
//   });
//   console.log("what is data", data);
//   return data;
// };

// console.log("LINK CONTAINER", linkContainer);
