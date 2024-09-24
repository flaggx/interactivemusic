export default `

type AccountSubscription @authorization(filter: [
  { where: { node: { account: { user: { userId: "$jwt.sub" } } } } }
]) {
    subscriptionId: String
    account: Account! @relationship(type: "HAS_ACCOUNT", direction: IN)
}    
`