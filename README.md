# Graph QL - Hackernews React Apollo Test

**(graphql-hackernews-react-apollo)**

A test of GraphQL using the tutorials at: https://www.howtographql.com/react-apollo/

## Running

- Change directory to ./src/server
- Install packages
- Run "yarn start"
- Change directory to ./
- Install packages
- Run "yarn start"
- See also: https://www.howtographql.com/react-apollo/1-getting-started/

## Tags

| Tag                | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| getting-started    | https://www.howtographql.com/react-apollo/1-getting-started/                       |
| loading-links      | https://www.howtographql.com/react-apollo/2-queries-loading-links/                 |
| creating-links     | https://www.howtographql.com/react-apollo/3-mutations-creating-links/              |
| routing            | https://www.howtographql.com/react-apollo/4-routing/                               |
| auth               | https://www.howtographql.com/react-apollo/5-authentication/                        |
| mutations-updating | https://www.howtographql.com/react-apollo/6-more-mutations-and-updating-the-store/ |
| searching          | https://www.howtographql.com/react-apollo/7-filtering-searching-the-list-of-links/ |
| subscriptions      | https://www.howtographql.com/react-apollo/8-subscriptions/                         |
| pagination         | https://www.howtographql.com/react-apollo/9-pagination/                            |

## Notes

I used hooks and functional components instead of hocs and class components/apollo mutation/query components. I also added some quick output for loading/error states in a quick and dirty way, this is just a tutorial after all :)

The user name of the person who posted is not working - not sure if this is because I changed the FE as described above so posts always show Unknown as the user who posted, and I never cared to look into this - sorry! My primary goal for doing this tutorial was to learn more about GraphQl and subscriptions.
