export default `

type Track @authorization(filter: [
  { where: { node: { playlist: { account: { user: { userId: "$jwt.sub" } } } } } }
]) {
    id: ID @id @unique
    trackName: String!
    likes: Int
    dislikes: Int
    """
    number of plays on track
    """
    numberOfPlays: Int
    playlist: Playlist @relationship(type: "HAS_PLAYLIST", direction: IN)
    author: Account! @relationship(type: "HAS_AUTHOR", direction: IN)
}
`