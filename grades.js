// we need to get these students' codes
// This first! on list of enrolled students
// TODO: move to preregister grades

// variables to avoid the old thing
let code = null,
  fgrade = null,
  grade = null,
  groupdivs = null,
  inputs = null,
  mux = null,
  n = null,
  name = null,
  name2code = null,
  rows = null,
  table = null,
  trs = null,
  x = null,
  y = null,
  z = null;

table = document.querySelectorAll("table")[8];
trs = table.querySelectorAll("tr");

name2code = {};
for (let i = 1; i < trs.length - 1; ++i) {
  name = trs[i]
    .querySelector("td:nth-child(2)")
    .innerText
    .trim()
    .toLowerCase()
    .split(", ")
    .reverse()
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u007e]/g, "");
  code = trs[i]
    .querySelector("td:nth-child(1)")
    .innerText
    .trim()
    .toLowerCase();
  name2code[name] = code;
}
console.log(name2code);

// run on new blackboard individual evaluation
rows = document.querySelectorAll(".individual-submission-row");
mux = {};
for (const row of rows) {
  if (row.querySelector(".status-nothing-to-grade") === null) {
    name = row
      .querySelector("bdi")
      .innerText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f\u007e]/g, "");
    grade = row.querySelectorAll("input")[1].value;
    if (!(name in name2code)) {
      console.log(`ERROR ERROR, ${name} is written different`);
      continue;
    }
    fgrade = parseFloat(grade);
    mux[name2code[name]] = fgrade;
    if (fgrade < 0 || fgrade > 20) {
      conosole.log(`ERROR! ${name} grade out of range ${fgrade}`);
    }
  }
}
console.log(mux);

// run on new blackboard group evaluation
groupdivs = document.querySelectorAll("form > div");
for (let i = 1; i < groupdivs.length; ++i) {
  btn = groupdivs[i].querySelectorAll("button")[0];
  if (btn !== undefined) {
    btn.click();
  } else {
    console.log("undefined button");
  }
}
await new Promise((r) => setTimeout(r, 2000));
groupdivs = document.querySelectorAll("form > div");
mux = {};
for (let i = 1; i < groupdivs.length; ++i) {
  rows = groupdivs[i].querySelectorAll(".member-row");
  for (row of rows) {
    name = row``
      .querySelector("bdi")
      .innerText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f\u007e]/g, "");
    grade = row.querySelector("input").value;
    if (!(name in name2code)) {
      console.log("ERROR ERROR, name is written different", name);
      continue;
    }
    fgrade = parseFloat(grade);
    mux[name2code[name]] = fgrade;
    if (fgrade < 0 || fgrade > 20) {
      conosole.log(`ERROR! ${name} grade out of range ${fgrade}`);
    }
  }
}
console.log(mux);

// run on classic blackboard

codecolumn = 3;
gradecolumn = 6;
n = document.querySelector("#table1").querySelectorAll("tr").length;
codes = [];
for (let i = 0; i < n; ++i) {
  codes.push(
    document
      .querySelector(`#cell_${i}_${codecolumn} .titleAnchor`)
      .firstChild
      .textContent,
  );
}
grades = [];
for (let i = 0; i < n; ++i) {
  code = document
    .querySelector(`#cell_${i}_${codecolumn} .titleAnchor`)
    .title;
  fgrade = parseFloat(
    document
      .querySelector(`#cell_${i}_${gradecolumn} .titleAnchor`)
      .title,
  );
  if (fgrade < 0 || fgrade > 20) {
    conosole.log(`ERROR! ${code} grade out of range ${fgrade}`);
  }
  grades.push(fgrade);
}

mux = {};
for (let i = 0; i < n; ++i) {
  mux[codes[i].slice(1).toLowerCase()] = grades[i];
}
console.log(mux);

// copy mux object

// run on socrates
inputs = document.querySelectorAll("input[id]");
for (const inp of inputs) {
  code = inp.id.substring(7, 16).toLowerCase();
  if (code in mux && mux[code] !== null) {
    inp.value = mux[code];
  } else {
    console.log(`ERROR ERROR ${code}`);
  }
}

// for midterms and finals
x = document.querySelector("#tb_notas");
y = x.querySelectorAll("tr");
for (let i = 1; i < y.length - 1; ++i) {
  z = y[i].querySelectorAll("td");
  code = z[1].innerText.toLowerCase();
  if (code in mux) {
    z[3].firstChild.value = mux[code];
  }
}
