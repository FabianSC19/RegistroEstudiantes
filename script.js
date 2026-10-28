"use strict";

// Lista inicial de estudiantes solicitada en el caso.
const students = [
  { nombre: "Maria", apellidos: "Mora Perez", nota: 90 },
  { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
  { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 },
];

const studentList = document.querySelector("#student-list");

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
}

renderStudents();
