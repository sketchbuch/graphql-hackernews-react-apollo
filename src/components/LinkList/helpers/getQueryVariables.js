import { LINKS_PER_PAGE } from '../../../constants/list'

export const getQueryVariables = (props) => {
  const isNewPage = props.location.pathname.includes('new')
  const page = parseInt(props.match.params.page, 10)
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
  const first = isNewPage ? LINKS_PER_PAGE : 100
  const orderBy = isNewPage ? 'createdAt_DESC' : null

  return { first, skip, orderBy }
}
