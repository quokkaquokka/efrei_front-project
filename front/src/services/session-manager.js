import Router from '../router/index'
import Store from '../store/modules/user'

export { refreshToken }


function refreshToken() {
    let tokenExpiryDate = Store.getters["tokensExpiryDate"]
    if (!tokenExpiryDate) {
        console.log("No token expiry date. user probably never logged in")
        return Router.push("/signin")
    }
    const reNewAt = tokenExpiryDate - 60
    const reNewIn = reNewAt - ( Date.now() / 1000 )
    // requete http pour faire un renew avec axios
    // stocker le token dans le store et mettre a jour les local storage

    setTimeout(refreshToken, reNewIn * 1000)
}

