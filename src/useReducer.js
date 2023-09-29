import React from "react";

const SECURITY_CODE = 'paradigma';



function UseReducer({ name }){

  const [state, dispatch] = React.useReducer(reducer, initialState);


  React.useEffect(() => {
    console.log('empezando el efecto');
    
    if (!!state.loading) {
      setTimeout(() => {
        console.log('Validando');        
        if (state.value === SECURITY_CODE) {
          dispatch({
            type:'CONFIRM'
          })
        } else {
          dispatch({ type: 'ERROR' })
        }        
        console.log('terminando validación');
      },1500);
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
            dispatch({ type: 'WRITE', payload: event.target.value})
            //onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: 'CHECK' })
          }}
        >Comprobar</button>
      </div>
    );

  } else if (!!state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>¿Seguro que quieres eliminar {name}?</p>
        <button
          onClick={() => {
            dispatch({ type: 'DELETE' })
          }}>Si, eliminar</button>
        <button
          onClick={() => {
            dispatch({ type: 'RESET' })
          }}>No, volver</button>
      </div>
    );
  } else {
    return (
      <>
        <h2>Eliminar {name}</h2>
        <p>Confirmada la eliminación.</p>
        <button
          onClick={() => {
            dispatch({ type: 'RESET' })
          }}>Restituir al principio</button>
      </>
    );
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  'CONFIRM':{ 
    ...state,
    error: false, 
    loading: false,
    confirmed: true,
  },
  'ERROR': {
    ...state,
    error:true,
    loading:false,
  },
  'WRITE': {
    ...state,
    value: payload
  },
  'CHECK': {
    ...state,
    loading:true,
  },
  'DELETE': {
    ...state,
    deleted:true,
  },
  'RESET': {
    ...state,
    value:'',
    confirmed:false,
    deleted:false,
  }
});

const reducer = (state, action) => {
  if (reducerObject(state, action.payload)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
