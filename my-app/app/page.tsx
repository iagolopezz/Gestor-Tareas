"use client"

import { useState } from "react";

export default function App() {
  // Estado para guardar la lista de tareas
  const [tareas, setTareas] = useState([]);
  // Estado para capturar lo que el usuario escribe
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Función para añadir una tarea
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;

    const tareaObjeto = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    };

    setTareas([...tareas, tareaObjeto]);
    setNuevaTarea("");
  };

  // Función para marcar como completada o pendiente
  const alternarTarea = (id) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareasActualizadas);
  };

  // Función para borrar una tarea
  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasFiltradas);
  };

  return (
    <div style={estilos.contenedor}>
      <h2>Mi Gestor de Tareas</h2>

      <form onSubmit={agregarTarea} style={estilos.formulario}>
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          style={estilos.input}
        />
        <button type="submit" style={estilos.boton}>
          Agregar
        </button>
      </form>

      <ul style={estilos.lista}>
        {tareas.length === 0 ? (
          <p style={estilos.vacio}>No tienes tareas pendientes.</p>
        ) : (
          tareas.map((tarea) => (
            <li key={tarea.id} style={estilos.item}>
              <span
                onClick={() => alternarTarea(tarea.id)}
                style={{
                  ...estilos.texto,
                  textDecoration: tarea.completada ? "line-through" : "none",
                  color: tarea.completada ? "#aaa" : "#000",
                }}
              >
                {tarea.texto}
              </span>
              <button
                onClick={() => eliminarTarea(tarea.id)}
                style={estilos.botonBorrar}
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// Estilos básicos en línea para que se vea ordenado
const estilos = {
  contenedor: { maxWidth: "400px", margin: "50px auto", fontFamily: "Arial", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "8px" },
  formulario: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
  boton: { padding: "8px 12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  lista: { listStyleType: "none", padding: 0 },
  item: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #eee" },
  texto: { cursor: "pointer", flex: 1 },
  botonBorrar: { padding: "4px 8px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  vacio: { color: "#777", textAlign: "center" }
};
