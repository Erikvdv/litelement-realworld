import { Reducer } from 'redux'
import {
  REGISTRATION_COMPLETED,
  REGISTRATION_FAILED,
  REGISTRATION_REQUESTED,
  RegistrationAction,
} from './registration.actions'
import { Errors } from '../models'
import { UserRegistration } from './registration.models'

export interface RegistrationState {
  userRegistration: UserRegistration
  failure: boolean
  isFetching: boolean
  isRegistered: boolean
  errors?: Errors
}

const initialState: RegistrationState = {
  userRegistration: { email: '', password: '', username: '' },
  failure: false,
  isFetching: false,
  isRegistered: false,
}

const registration: Reducer<RegistrationState, RegistrationAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REGISTRATION_REQUESTED:
      return {
        ...initialState,
        isFetching: true,
        failure: false,
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        isFetching: false,
        failure: true,
        errors: action.errors,
      }
    case REGISTRATION_COMPLETED:
      return {
        ...state,
        isFetching: false,
        isRegistered: true,
      }
    default:
      return state
  }
}

export default registration
