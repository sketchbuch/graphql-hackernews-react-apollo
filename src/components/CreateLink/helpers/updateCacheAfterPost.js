
import { FEED_QUERY } from '../../../graphql/queries/feedQuery'

export const updateCacheAfterPost = (client, post) => {
  const data = client.readQuery({ query: FEED_QUERY })
  data.feed.links.unshift(post)
  client.writeQuery({
    query: FEED_QUERY,
    data
  })
}