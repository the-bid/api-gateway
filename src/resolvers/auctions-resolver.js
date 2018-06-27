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
  }
}

module.exports = Auction
