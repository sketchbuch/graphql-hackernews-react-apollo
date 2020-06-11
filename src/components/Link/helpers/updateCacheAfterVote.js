
import { FEED_QUERY } from '../../../graphql/queries/feedQuery'

export const updateCacheAfterVote = (client, createVote, linkId) => {
  const data = client.readQuery({ query: FEED_QUERY })

  const votedLink = data.feed.links.find(link => link.id === linkId)
  votedLink.votes = createVote.link.votes

  client.writeQuery({ query: FEED_QUERY, data })
}