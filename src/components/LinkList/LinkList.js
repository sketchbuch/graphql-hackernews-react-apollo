import React from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { FEED_QUERY } from '../../graphql/queries/feedQuery'
import { NEW_LINKS_SUBSCRIPTION } from '../../graphql/subscriptions/newLinkSubscription'
import { NEW_VOTES_SUBSCRIPTION } from '../../graphql/subscriptions/newVoteSubscription'
import { Link } from '../Link/Link'

export const LinkList = () => {
  const { loading, data, error } = useQuery(FEED_QUERY, {
    variables: { language: 'english' },
  });
  const { data: newPostData } = useSubscription(NEW_LINKS_SUBSCRIPTION);
  const { data: newVoteData } = useSubscription(NEW_VOTES_SUBSCRIPTION);

  const getLinksToRender = () => {
    let links = []

    if (data && data.feed && data.feed.links) {
      links = [...data.feed.links]
    }

    if (newPostData && newPostData.newLink) {
      const newLink = { ...newPostData.newLink }

      if (!links.find((link) => link.id === newLink.id)) {
        links = [...links, newLink]
      }
    }

    if (newVoteData && newVoteData.newVote) {
      const { link } = newVoteData.newVote

      links.reduce((allLinks, curLink) => {
        if (curLink.id === link.id) {
          return [...allLinks, link]
        }

        return [...allLinks, curLink]
      }, [])
    }

    return links
  }

  if (loading) { return <p>Loading ...</p> } else if (error) {
    return <p>Error: {error.message}</p>
  }

  const linksToRender = getLinksToRender()

  return (
    <div>{linksToRender.map((link, index) => <Link key={link.id} link={link} index={index} />)}</div>
  )
}