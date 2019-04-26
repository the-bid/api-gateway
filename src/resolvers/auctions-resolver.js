const Auction = {
  owner: {
    fragment: `... on Auction { ownerId }`,
    async resolve(parent, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'user',
        args: {
          id: parent.ownerId
        },
        context,
        info
      })
    }
  },
  players: {
    fragment: `... on Auction {playerIds}`,
    async resolve(parent, args, context, info) {
      const filter = parent.playerIds.reduce((searchString, playerId) => `${searchString} OR id:${playerId}`)
      return info.mergeInfo.delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'users',
        args: {
          filter
        },
        context,
        info
      })
    }
  }
}

module.exports = Auction
