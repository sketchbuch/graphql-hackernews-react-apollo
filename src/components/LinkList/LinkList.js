import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { feedQuery } from '../../graphql/queries/feedQuery'
import { Link } from '../Link/Link'

export const LinkList = () => {
  const { loading, data, error } = useQuery(feedQuery, {
    variables: { language: 'english' },
  });

  if (loading) { return <p>Loading ...</p> } else if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>{data.feed.links.map(link => <Link key={link.id} link={link} />)}</div>
  )
}