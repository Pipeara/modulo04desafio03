import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Formulario = ({ onSubmit }) => {
  const [colaborador, setColaborador] = useState({
    nombre: '',
    correo: '',
    edad: '',
    cargo: '',
    telefono: '',
  });
  const [alert, setAlert] = useState({ error: false, msg: '', color: '' });

  const capturaInput = (e) => {
    const { name, value } = e.target;
    setColaborador((prevColaborador) => ({
      ...prevColaborador,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      colaborador.nombre === '' ||
      colaborador.correo === '' ||
      colaborador.edad === '' ||
      colaborador.cargo === '' ||
      colaborador.telefono === ''
    ) {
      setAlert({
        error: true,
        msg: 'Completa todos los campos del colaborador!',
        color: 'danger',
      });
    } else if (parseInt(colaborador.edad) < 18) {
      setAlert({
        error: true,
        msg: 'La edad debe ser mayor o igual a 18',
        color: 'danger',
      });
    } else if (!/^\d+$/.test(colaborador.telefono)) {
      setAlert({
        error: true,
        msg: 'El teléfono debe contener solo números',
        color: 'danger',
      });
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(colaborador.correo)) {
      setAlert({
        error: true,
        msg: 'Ingresa un correo electrónico válido',
        color: 'danger',
      });
    } else {
      onSubmit(colaborador); // Llama a la función onSubmit con el nuevo colaborador

      setColaborador({
        nombre: '',
        correo: '',
        edad: '',
        cargo: '',
        telefono: '',
      });

      // Limpiar mensaje después de agregar colaborador exitosamente
      setAlert({ error: false, msg: '', color: '' });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Nombre"
          name="nombre"
          className="my-3"
          onChange={capturaInput}
          value={colaborador.nombre}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Correo"
          name="correo"
          className="my-3"
          onChange={capturaInput}
          value={colaborador.correo}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="number"
          placeholder="Edad"
          name="edad"
          className="my-3"
          onChange={capturaInput}
          value={colaborador.edad}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Cargo"
          name="cargo"
          className="my-3"
          onChange={capturaInput}
          value={colaborador.cargo}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Teléfono"
          name="telefono"
          className="my-3"
          onChange={capturaInput}
          value={colaborador.telefono}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Agregar Colaborador
      </Button>
      {alert.msg && (
        <div className={`alert alert-${alert.color}`} role="alert">
          {alert.msg}
        </div>
      )}
    </Form>
  );
};

export default Formulario;
