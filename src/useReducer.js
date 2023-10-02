import React from "react";

const SECURITY_CODE = 'paradigma';



function UseReducer({ name }){

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm});
  const onError = () => dispatch({ type: actionTypes.error });
  const onWrite = (event) => {dispatch({ type: actionTypes.write, payload: event.target.value })};
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  React.useEffect(() => {
    console.log('empezando el efecto');
    
    if (!!state.loading) {
      setTimeout(() => {
        console.log('Validando');        
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
          onChange={onWrite}
        />
        <button
          onClick={onCheck}
        >Comprobar</button>
      </div>
    );

  } else if (!!state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>¿Seguro que quieres eliminar {name}?</p>
        <button
          onClick={onDelete}>Si, eliminar</button>
        <button
          onClick={onReset}>No, volver</button>
      </div>
    );
  } else {
    return (
      <>
        <h2>Eliminar {name}</h2>
        <p>Confirmada la eliminación.</p>
        <button
          onClick={onReset}>Restituir al principio</button>
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

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET'
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]:{ 
    ...state,
    error: false, 
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error:true,
    loading:false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.check]: {
    ...state,
    loading:true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted:true,
  },
  [actionTypes.reset]: {
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
