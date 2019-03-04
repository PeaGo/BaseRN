export const ACTION_SHOW_LOADING = 'SHOW_LOADING'
export const ACTION_HIDE_LOADING = 'HIDE_LOADING'

export const show_loading = () => {
    return {
        type : ACTION_SHOW_LOADING
    }
}

export const hide_loading = () => {
    return {
        type : ACTION_HIDE_LOADING
    }
}