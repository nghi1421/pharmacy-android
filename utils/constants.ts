import { DropdownItem } from "../types/DropdownItem"

export const SOCKET_URL = 'http://192.168.1.27:3000/'
export const SIGN_IN_CUSTOMER_URL = 'sign-up'
export const LOGIN_URL = 'login'
export const VERIFY_EMAIL_URL = 'verify-email'
export const CHECK_SEND_OTP_URL = 'check-send-otp'
export const GET_HISTORIES_URL = 'histories/'
export const UPDATE_PROFILE_URL = 'update-profile/'
export const CHANGE_PASSWORD_URL = 'change-password'

export const genders: DropdownItem[] = [
    {
        label: 'Nữ',
        value: '0'
    },
    {
        label: 'Nam',
        value: '1'
    },
    {
        label: 'Khác',
        value: '2'
    }
]