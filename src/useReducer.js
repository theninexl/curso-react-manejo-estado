const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};
//hay 3 formas de crear un reducer
//1 la más obvia:
const reducer = (state, action) => {
  if (action.type === 'ERROR') {
    return {
      ...state,
      error:true,
      loading:false,
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading:true,
    };
  } else {
    return {
      ...state,
    }
  }
};

//2 la más popular
const reducerSwitch = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error:true,
        loading:false,
        };
      case 'CHECK':
        return {
          ...state,
          loading:true,
        };
      default:
        return {
          ...state,
        }
  }
}

//3 la más limpia

const reducerObject = (state) => ({
  'ERROR': {
    ...state,
    error:true,
    loading:false,
  },
  'CHECK': {
    ...state,
    loading:true,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
}
