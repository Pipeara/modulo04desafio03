import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Formulario from './components/Formulario';
import Buscador from './components/Buscador';
import Alert from './components/Alert';
import Listado from './components/Listado';
import BaseColaboradores from './Coloboradores';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [colaboradores, setColaboradores] = useState(BaseColaboradores);
  const [mensaje, setMensaje] = useState({ msg: '', type: '' });

  const agregarColaborador = (nuevoColaborador) => {
    if (
      nuevoColaborador.nombre === '' ||
      nuevoColaborador.correo === '' ||
      nuevoColaborador.edad === '' ||
      nuevoColaborador.cargo === '' ||
      nuevoColaborador.telefono === ''
    ) {
      setMensaje({ msg: 'Completa todos los campos del colaborador', type: 'danger' });
    } else {
      setColaboradores([...colaboradores, nuevoColaborador]);
      setMensaje({ msg: 'Colaborador agregado exitosamente', type: 'success' });

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setMensaje({ msg: '', type: '' });
      }, 3000);
    }
  };

  const buscarColaboradores = (filtro) => {
    const colaboradoresFiltrados = BaseColaboradores.filter((colaborador) =>
      Object.values(colaborador).some(value =>
        value.toString().toLowerCase().includes(filtro.toLowerCase())
      )
    );
    setColaboradores(colaboradoresFiltrados);
    setMensaje({ msg: '', type: '' }); // Limpiar mensaje cuando se realiza una búsqueda
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Lista de Colaboradores</h1>
      <Row>
        <Col sm={12}>
          <Row>
            <Col className="text-center mb-4">
              <Buscador buscarColaboradores={buscarColaboradores} />
            </Col>
          </Row>
        </Col>
        <Col sm={9}>
          <Row>
            <Col>
              <Listado colaboradores={colaboradores} />
            </Col>
          </Row>
        </Col>
        <Col md={3} className="">
          <Row>
            <Col>
              <Formulario onSubmit={agregarColaborador} />
            </Col>
          </Row>
          <Row>
            <Col>
              {mensaje.msg && (
                <Alert color={mensaje.type}>
                  {mensaje.msg}
                </Alert>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
