export const initialState = {
  auth:{
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
  },
  data:{
    isFetching: false,
    isFailure: false,
    data: {
        games : [],
        discoveries : []
    }
  }
};