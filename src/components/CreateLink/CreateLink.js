import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { POST_MUTATION } from '../../graphql/mutations/postMutation'

export const CreateLink = (props) => {
  const [state, setState] = React.useState({
    description: '',
    url: '',
  })
  const { description, url } = state
  const [postMutation, { error, loading: submitting }] = useMutation(POST_MUTATION);

  const handleInputChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value })
  }

  const handleCreatePost = () => {
    postMutation({ variables: { description, url } }).then(() => {
      props.history.push('/')
    }).catch(error => {
      // Do nothing...
    })
  }

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={handleInputChange('description')}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={handleInputChange('url')}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button onClick={handleCreatePost}>Submit</button>
      {submitting && <p>Submitting post...</p>}
      {error && <p>Error submitting: {error.message}</p>}
    </div>
  )
}