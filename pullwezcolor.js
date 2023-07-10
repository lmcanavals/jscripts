const name = "birdsofparadise";
let colors = "";
const rgb2hex = (rgb) =>
  `#${
    rgb
      .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
      .slice(1)
      .map((n) =>
        parseInt(n, 10)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  }`;
for (let i = 0; i < 16; ++i) {
  const x = document.querySelector(`#${name}-player .fg-${i}`);
  const rgb = window.getComputedStyle(x, null).getPropertyValue("color");
  colors += rgb2hex(rgb) + "\n";
}
console.log(colors);
