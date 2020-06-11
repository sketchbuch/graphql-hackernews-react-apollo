import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo'
import { Link } from '../Link/Link'
import { FEED_SEARCH_QUERY } from '../../graphql/queries/feedSearchQuery'

export const Search = ({ filter = '', changeFilter }) => {
  const { loading, data, error } = useQuery(FEED_SEARCH_QUERY, {
    variables: { filter },
  });
  const [searchTerm, changeSearchTerm] = React.useState(filter)
  const { links } = data && data.feed ? data.feed : { links: [] }

  return (
    <div>
      <div>
        Search
        <input
          id="search"
          name="search"
          onChange={e => changeSearchTerm(e.target.value)}
          type='text'
          value={searchTerm}
        />
        <button onClick={() => changeFilter(searchTerm)}>OK</button>
      </div>
      {!loading && filter && links && links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
      {!loading && filter && !links && <p>No matching posts forund</p>}
      {!loading && filter && error && <p>Error searching posts: {error.message}</p>}
      {filter && loading && <p>Searching...</p>}
    </div>
  )
}

export default withApollo(Search)