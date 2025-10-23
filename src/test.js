// async function fetchData() {
//   try {
//     const response = await new Promise((resolve) => {
//       setTimeout(() => resolve("Data received!"), 2000);
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// // Calling the async function
// fetchData();

const image = document.querySelector("img");

image.addEventListener("click", () => {
  image.classList.toggle("rotate");
});

async () => {

}