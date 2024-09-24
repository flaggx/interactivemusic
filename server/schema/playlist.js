export default `

type Playlist @authorization(filter: [
  { where: { node: { account: { user: { userId: "$jwt.sub" } } } } }
]) {
    id: ID @id @unique
    playlistName: String!
    likes: Int
    dislikes: Int
    """
    number of plays on playlist
    """
    numberOfPlays: Int
    playlistTrack: [Track!]! @relationship(type: "HAS_TRACK", direction: OUT)
    account: Account! @relationship(type: "HAS_ACCOUNT", direction: IN)
    author: Account! @relationship(type: "HAS_AUTHOR", direction: IN)
}
`