import config from '../../client.config'

// GET /ads -> recupere totue les annonces
// GET ads/{id}  -> lit une annonce via l'id

// ATTENTION pour pouvoir modifier il faut un headers, afin que tous le monde ne puisse pas le modifier
// dans le header il faut mettre "Authorization"
// POST  /ads  -> ajoute une annonce
// PUT /ads/{id} -> modifie une annonce avec l'id
// DELETE /ads/{id} -> supprime l'annonce via l'id
