const Bid = {
  user: {
    fragment: `... on Bid { userId } `,
    async resolve(parent, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'user',
        args: {
          id: parent.userId
        },
        context,
        info
      })
    }
  },
  auction: {
    fragment: `... on Bid { auctionId }`,
    async resolve(parent, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'auction',
        args: {
          id: parent.auctionId
        },
        context,
        info
      })
    }
  },
  team: {
    fragment: `... on Bid { teamId }`,
    async resolve(parent, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'team',
        args: {
          id: parent.teamId
        },
        context,
        info
      })
    }
  }
}

module.exports = Bid
