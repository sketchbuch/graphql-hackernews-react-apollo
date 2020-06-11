import React from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { FEED_QUERY } from '../../graphql/queries/feedQuery'
import { getQueryVariables } from './helpers/getQueryVariables'
import { Link } from '../Link/Link'
import { LINKS_PER_PAGE } from '../../constants/list'
import { NEW_LINKS_SUBSCRIPTION } from '../../graphql/subscriptions/newLinkSubscription'
import { NEW_VOTES_SUBSCRIPTION } from '../../graphql/subscriptions/newVoteSubscription'

export const LinkList = (props) => {
  const queryVars = getQueryVariables(props)
  const { client, loading, data, error } = useQuery(FEED_QUERY, { variables: { language: 'english', ...queryVars } });
  const { data: newPostData } = useSubscription(NEW_LINKS_SUBSCRIPTION);
  const { data: newVoteData } = useSubscription(NEW_VOTES_SUBSCRIPTION);
  const count = data && data.feed ? data.feed.count : -1

  const getLinksToRender = (isNewPage) => {
    let links = []

    if (data && data.feed && data.feed.links) {
      links = [...data.feed.links]

      // Sort posts by vote for top rated page
      if (!isNewPage) {
        links.sort((l1, l2) => l2.votes.length - l1.votes.length)
      }
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

  const nextPage = () => {
    const page = parseInt(props.match.params.page, 10)

    if (page <= data.feed.count / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`)
    }
  }

  const previousPage = () => {
    const page = parseInt(props.match.params.page, 10)

    if (page > 1) {
      props.history.push(`/new/${page - 1}`)
    }
  }

  if (loading) { return <p>Loading ...</p> } else if (error) {
    return <p>Error: {error.message}</p>
  }

  const isNewPage = props.location.pathname.includes('new')
  const linksToRender = getLinksToRender(isNewPage)
  const pageIndex = props.match.params.page
    ? (props.match.params.page - 1) * LINKS_PER_PAGE
    : 0
  const isLastPage = count && count < queryVars.skip + LINKS_PER_PAGE

  return (
    <div>
      {linksToRender.map((link, index) => <Link key={link.id} link={link}
        index={index + pageIndex} />)}
      {isNewPage && (
        <div className="flex ml4 mv3 gray">
          <div className="pointer mr2" style={pageIndex > 0 ? {} : { opacity: 0.5, pointerEvents: 'none' }} onClick={previousPage}>
            Previous
          </div>
          <div className="pointer" style={isLastPage ? { opacity: 0.5, pointerEvents: 'none' } : {}} onClick={nextPage}>
            Next
          </div>
        </div>
      )}
    </div>
  )
}