import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }){
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    console.log('empezando el efecto');
    if (!!loading) {
      setTimeout(() => {
        console.log('Validando');
        
        setLoading(false);
        if (value !== SECURITY_CODE) {
          setError(true); 
        } else {
          setError(false);
        }
        
        console.log('terminando validación');
      },3000);
    } 

    console.log('terminando el efecto');
  },[loading])

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {(error && !loading) && (
        <p>Error: el código es incorrecto</p>
      )}
      {loading && (
        <p>Cargando...</p>
      )}
      <input 
        placeholder='Código de seguridad'
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setLoading(true);
        }}
      >Comprobar</button>
    </div>
  );
}

export { UseState };