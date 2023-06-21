"use client";

import React, { useState } from "react";

export const CompleteForm = () => {
  const parsedData = JSON.parse(localStorage.getItem("formData") || "");

  return (
    <div>
      <p>Gracias "{parsedData.name}" por completar el formulario</p>
      <br />

      <p>email: {parsedData.email}</p>
      <p>direccion: {parsedData.direccion}</p>
      <p>genero: {parsedData.gender}</p>
      <p>pais: {parsedData.pais}</p>
    </div>
  );
};
