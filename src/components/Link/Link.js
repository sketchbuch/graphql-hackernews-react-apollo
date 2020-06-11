import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { AUTH_TOKEN } from '../../constants/auth'
import { timeDifferenceForDate } from './helpers/timeDifferenceForDate'
import { updateCacheAfterVote } from './helpers/updateCacheAfterVote'
import { VOTE_MUTATION } from '../../graphql/mutations/voteMutation'

export const Link = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const [voteMutation, { client, loading }] = useMutation(VOTE_MUTATION);

  const vote = () => {
    voteMutation({ variables: { linkId: props.link.id } }).then(() => {
      updateCacheAfterVote(client, vote, props.link.id)
    }).catch(error => {
      // Do nothing...
    })
  }

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={() => vote()} style={{ cursor: 'pointer' }}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className="f6 lh-copy gray">
          {props.link.votes.length} votes | by{' '}
          {props.link.postedBy
            ? props.link.postedBy.name
            : 'Unknown'}{' '}
          {timeDifferenceForDate(props.link.createdAt)}
        </div>
        {loading && (
          <p>Submitting vote...</p>
        )}
      </div>
    </div>
  )
}