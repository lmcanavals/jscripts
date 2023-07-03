// run on blackboard

const codecolumn = 3;
const gradecolumn = 6;
const n = document.querySelector("#table1").querySelectorAll("tr").length;
const codes = [];
for (let i = 0; i < n; ++i) {
  codes.push(
    document
      .querySelector(`#cell_${i}_${codecolumn} .titleAnchor`)
      .firstChild
      .textContent,
  );
}
const grades = [];
for (let i = 0; i < n; ++i) {
  grades.push(parseFloat(
    document
      .querySelector(`#cell_${i}_${gradecolumn} .titleAnchor`)
      .firstChild
      .textContent,
  ));
}

const mix = {};
for (let i = 0; i < n; ++i) {
  mix[codes[i].slice(1).toLowerCase()] = grades[i];
}
console.log(mix);

// copy mix object

// run on socrates

const inputs = document.querySelectorAll("input[id]");
for (const inp of inputs) {
  const code = inp.id.substring(7, 16).toLowerCase();
  if (code in mix && mix[code] !== null) {
    inp.value = mix[code];
  }
}
