const {setContext} = require('apollo-link-context')
const {get} = require('lodash')

function parseBearerToken(request){
  return request.headers.authorization.replace('Bearer ','')
}

function addAuthHeaderContext(){
  return setContext((request,previousContext)=>{
    const bearerToken = get(previousContext,'graphqlContext.bearerToken')
    if(bearerToken){
      return {
        headers:{
          'authorization': `Bearer ${bearerToken}`
        }
      }
    }else{
      return {}
    }
  })
}

module.exports = {parseBearerToken,addAuthHeaderContext}
