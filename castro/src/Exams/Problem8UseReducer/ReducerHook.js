const [loginState, dispatch] = useReducer(loginReducer, {
    isLoading: false,
    isLoggedIn: false,
    error: null
  });