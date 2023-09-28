import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }){
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);
  // const [value, setValue] = React.useState('');

  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
  });


  React.useEffect(() => {
    console.log('empezando el efecto');
    if (!!state.loading) {
      setTimeout(() => {
        console.log('Validando');
        
        // setLoading(false);
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
          })
        } else {
          setState({
            ...state,
            error:true,
            loading:false
          })
        }
        
        console.log('terminando validación');
      },3000);
    } 

    console.log('terminando el efecto');
  },[state.loading])

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {(state.error && !state.loading) && (
        <p>Error: el código es incorrecto</p>
      )}
      {state.loading && (
        <p>Cargando...</p>
      )}
      <input 
        placeholder='Código de seguridad'
        value={state.value}
        onChange={(event) => {
          // setValue(event.target.value);
          setState({
            ...state,
            value: event.target.value,
          })
        }}
      />
      <button
        onClick={() => {
          // setLoading(true);
          setState({
            ...state,
            loading:true,
          })
        }}
      >Comprobar</button>
    </div>
  );
}

export { UseState };