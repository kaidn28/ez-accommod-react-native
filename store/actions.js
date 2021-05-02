export const UPDATE_INFOR = 'UPDATE_INFOR'
export const GET_DATA = 'GET_DATA'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'
export const DATA_REQ_SENT = 'DATA_REQ_SENT'
export const DATA_REQ_SUCCEED = 'DATA_REQ_SUCCEED'
export const DATA_REQ_FAILED = 'DATA_REQ_FAILED'
export const LOG_IN = 'LOG_IN'

export const updateInfor = (infor) => ({type: UPDATE_INFOR, payload: infor})

export const addEmployee = (infor) => ({type: ADD_EMPLOYEE, payload: infor})

export const login = () => ({type: LOG_IN})