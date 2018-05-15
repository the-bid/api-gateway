const User = {
  auctions: {
    fragment: `fragment UserFragment on User { id }`,
    async resolve(parent, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'auctionsByUser',
        args: {
          userId: parent.id
        },
        context,
        info
      })
    }
  }
}

module.exports = User
