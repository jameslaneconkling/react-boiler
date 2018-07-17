/* tslint:disable */
// @ts-ignore
import * as React from 'react';
import { graphql, ChildDataProps, ChildProps } from 'react-apollo';
import gql from 'graphql-tag'


// https://stackoverflow.com/questions/48441340/using-react-components-with-apollo-client-and-typescript

export interface Article {
  id: string,
  shortText: string,
  publicationDate: string
}

export type ArticlesFeedResponse = {
  feed: Article[];
}

const ARTICLES_FEED = gql`
    query ArticlesFeed {
        feed {
            id
            shortText
            publicationDate
        }
    }
`;

const AppQL = graphql<{}, ArticlesFeedResponse>(ARTICLES_FEED);

class App extends React.Component<ChildProps<{}, ArticlesFeedResponse>, {}> {
  render() {
    const { loading, feed, error } = this.props.data!;

    if (loading) return <div>loading </div>;
    if (error) return <div>{error} </div>;

    return (
      <React.Fragment>
        <h1>It works!</h1>
        {
          feed && feed.map((article: Article) => (
            <div>{article.shortText} </div>
          ))
        }
      </React.Fragment>
    );
  }
}

export const AppContainer = AppQL(App);

const AppSFC: React.SFC<ChildDataProps<{}, ArticlesFeedResponse>> = ({ data: { loading, feed, error } }) => {
  if (loading) return <div>loading </div>;
  if (error) return <div>{error} </div>;

  return (
    <React.Fragment>
      <h1>It works!</h1>
      {
        feed && feed.map((article: Article) => (
          <div>{article.shortText} </div>
        ))
      }
    </React.Fragment>
  );
};

export const AppSFCContainer = AppQL(AppSFC);
