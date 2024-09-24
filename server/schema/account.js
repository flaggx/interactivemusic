export default `

type Account @authorization(filter: [
  { where: { node: { user: { userId: "$jwt.sub" } } } }
]) {
  """
  System generated GUID
  """
  id: ID @id @unique
  """
  Username that others will see.
  """
  username: String!
  """
  Number of followers
  """
  followersCount: Int
  """
  Accounts about me bio
  """
  bio: String
  """
  member since date
  """
  memberSince: String!
  """
  account hours of music listened to
  """
  hoursListened: Int
  subscription: AccountSubscription @relationship(type: "HAS_SUBSCRIPTION", direction: OUT)
  playlist: Playlist @relationship(type: "HAS_PLAYLIST", direction: OUT)
  followsAccount: Account @relationship(type: "FOLLOWS_ACCOUNT", direction: OUT)
  followedByAccount: Account @relationship(type: "ACCOUNT_FOLLOWS", direction: IN)
  user: User! @relationship(type: "HAS_ACCOUNT", direction: IN)
}
`