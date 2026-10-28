"use strict";

// Lista inicial de estudiantes solicitada en el caso.
const students = [
  { nombre: "Maria", apellidos: "Mora Perez", nota: 90 },
  { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
  { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 },
];

const studentList = document.querySelector("#student-list");
const form = document.querySelector("#student-form");
const nameInput = document.querySelector("#first-name");
const surnameInput = document.querySelector("#last-name");
const gradeInput = document.querySelector("#grade");
const message = document.querySelector("#form-message");

function createCell(text, className = "") {
  const cell = document.createElement("td");
  cell.textContent = text;
  if (className) cell.className = className;
  return cell;
}

function renderStudents() {
  studentList.replaceChildren();

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    const gradeClass = student.nota >= 80
      ? "grade-high"
      : student.nota < 65 ? "grade-low" : "grade-standard";
    const result = student.nota >= 80 ? "Nota alta" : student.nota < 65 ? "Nota baja" : "En progreso";

    row.append(
      createCell(String(index + 1)),
      createCell(student.nombre, "student-name"),
      createCell(student.apellidos),
    );

    const gradeCell = document.createElement("td");
    const gradeBadge = document.createElement("span");
    gradeBadge.className = `grade-pill ${gradeClass}`;
    gradeBadge.textContent = String(student.nota);
    gradeCell.append(gradeBadge);
    row.append(gradeCell, createCell(result, "result-text"));
    studentList.append(row);
  });

  document.querySelector("#student-count").textContent = `${students.length} estudiantes`;
  updateSummary();
}

function updateSummary() {
  const highest = students.reduce((best, student) => student.nota > best.nota ? student : best);
  const lowest = students.reduce((best, student) => student.nota < best.nota ? student : best);
  const average = students.reduce((total, student) => total + student.nota, 0) / students.length;

  document.querySelector("#highest-grade").textContent = String(highest.nota);
  document.querySelector("#highest-student").textContent = `${highest.nombre} ${highest.apellidos}`;
  document.querySelector("#average-grade").textContent = average.toFixed(1);
  document.querySelector("#lowest-grade").textContent = String(lowest.nota);
  document.querySelector("#lowest-student").textContent = `${lowest.nombre} ${lowest.apellidos}`;
}

function clearValidation() {
  [nameInput, surnameInput, gradeInput].forEach((input) => input.removeAttribute("aria-invalid"));
  message.textContent = "";
  message.classList.remove("success");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearValidation();

  const nombre = nameInput.value.trim();
  const apellidos = surnameInput.value.trim();
  const rawGrade = gradeInput.value.trim();
  const nota = Number(rawGrade);
  let firstInvalidField = null;

  if (!nombre) {
    nameInput.setAttribute("aria-invalid", "true");
    firstInvalidField ??= nameInput;
  }
  if (!apellidos) {
    surnameInput.setAttribute("aria-invalid", "true");
    firstInvalidField ??= surnameInput;
  }
  if (!rawGrade || !Number.isFinite(nota) || nota < 0 || nota > 100) {
    gradeInput.setAttribute("aria-invalid", "true");
    firstInvalidField ??= gradeInput;
  }

  if (firstInvalidField) {
    message.textContent = !nombre || !apellidos || !rawGrade
      ? "Todos los campos son obligatorios. La nota debe estar entre 0 y 100."
      : "La nota debe ser un número entre 0 y 100.";
    firstInvalidField.focus();
    return;
  }

  students.push({ nombre, apellidos, nota });
  renderStudents();
  form.reset();
  message.textContent = "Estudiante agregado correctamente.";
  message.classList.add("success");
  nameInput.focus();
});

[nameInput, surnameInput, gradeInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (!message.classList.contains("success")) message.textContent = "";
  });
});

renderStudents();
