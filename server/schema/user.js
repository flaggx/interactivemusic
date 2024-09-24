export default `
extend schema @authentication

type User @authorization(filter: [
    { where: { node: { userId: "$jwt.sub" } } }
]) @query(read: true, aggregate: false) {
    """
    System generated GUID
    """
    id: ID! @id
    """
    Authentication Service Unique Id
    """
    userId: ID! @unique
    """
    Users email this is the login email
    """
    email: String!
    """
    Users profile picture url
    """
    picture: String
    """
    Users password
    """
    password: String!
    account: Account @relationship(type: "HAS_ACCOUNT", direction: OUT)
}


input UserCreateInput {
    userId: String!
    email: String!
    picture: String
    account: AccountCreateInput
}


type Query {
  me: User
  @cypher(
      statement: """
      MATCH (u:User {userId: $jwt.sub})
      RETURN u
      """,
      columnName: "u"
  ) 
}

`