// we need to get these students' codes
// This first! on list of enrolled students
// TODO: move to preregister grades
const table = document.querySelectorAll("table")[8];
const trs = table.querySelectorAll("tr");

const name2code = {};
for (let i = 1; i < trs.length - 1; ++i) {
  const name = trs[i]
    .querySelector("td:nth-child(2)")
    .innerText
    .trim()
    .toLowerCase()
    .split(", ")
    .reverse()
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u007e]/g, "");
  const code = trs[i]
    .querySelector("td:nth-child(1)")
    .innerText
    .trim()
    .toLowerCase();
  name2code[name] = code;
}
console.log(name2code);

// run on new blackboard individual evaluation
const rows = document.querySelectorAll(".individual-submission-row");
const mux = {};
for (const row of rows) {
  if (row.querySelector(".status-nothing-to-grade") === null) {
    const name = row
      .querySelector("bdi")
      .innerText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f\u007e]/g, "");
    const grade = row.querySelectorAll("input")[1].value;
    if (!(name in name2code)) {
      console.log(`ERROR ERROR, ${name} is written different`);
      continue;
    }
    mux[name2code[name]] = parseFloat(grade);
  }
}
console.log(mux);

// run on new blackboard group evaluation
let groupdivs = document.querySelectorAll("form > div");
for (let i = 1; i < groupdivs.length; ++i) {
  const btn = groupdivs[i].querySelectorAll("button")[0];
  if (btn !== undefined) {
    btn.click();
  } else {
    console.log("undefined button");
  }
}
await new Promise((r) => setTimeout(r, 2000));
groupdivs = document.querySelectorAll("form > div");
const mex = {};
for (let i = 1; i < groupdivs.length; ++i) {
  const rows = groupdivs[i].querySelectorAll(".member-row");
  for (const row of rows) {
    const name = row
      .querySelector("bdi")
      .innerText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f\u007e]/g, "");
    const grade = row.querySelector("input").value;
    if (!(name in name2code)) {
      console.log("ERROR ERROR, name is written different");
      continue;
    }
    mex[name2code[name]] = parseFloat(grade);
  }
}
console.log(mex);

// run on classic blackboard

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
  } else {
    console.log(`ERROR ERROR ${code}`);
  }
}

// for midterms and finals
const x = document.querySelector("#tb_notas");
const y = x.querySelectorAll("tr");
for (let i = 1; i < y.length - 1; ++i) {
  const z = y[i].querySelectorAll("td");
  const code = z[1].innerText.toLowerCase();
  if (code in mix) {
    z[3].firstChild.value = mix[code];
  }
}
