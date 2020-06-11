
import { FEED_QUERY } from '../../../graphql/queries/feedQuery'
import { LINKS_PER_PAGE } from '../../../constants/list'

export const updateCacheAfterPost = (client, post) => {
  const first = LINKS_PER_PAGE
  const skip = 0
  const orderBy = 'createdAt_DESC'
  const data = client.readQuery({
    query: FEED_QUERY,
    variables: { first, skip, orderBy }
  })
  data.feed.links.unshift(post)
  client.writeQuery({
    query: FEED_QUERY,
    data,
    variables: { first, skip, orderBy }
  })
}