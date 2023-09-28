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
    deleted: false,
    confirmed: false,
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
            confirmed: true,
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

  if (!state.deleted && !state.confirmed) {
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
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <h2>Eliminar {name}</h2>
        <p>¿Seguro que quieres eliminar {name}?</p>
        <button
          onClick={()=>{
            setState({
              ...state,
              deleted:true,
            })
          }}>Si, eliminar</button>
        <button
          onClick={()=>{
            setState({
              ...state,
              value:'',
              confirmed:false
            })
          }}>No, volver</button>
      </>
    );
  } else {
    return (
      <>
        <h2>Eliminar {name}</h2>
        <p>Confirmada la eliminación.</p>
        <button
          onClick={()=>{
            setState({
              ...state,
              value:'',
              confirmed:false,
              deleted:false,
            })
          }}>Restituir al principio</button>
      </>
    );
  }
}

export { UseState };