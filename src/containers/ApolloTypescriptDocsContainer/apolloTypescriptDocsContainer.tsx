/* tslint:disable */
import React, { SFC } from "react";
import gql from "graphql-tag";
import { graphql, ChildProps, ChildDataProps } from "react-apollo";

const HERO_QUERY = gql`
  query GetCharacter($episode: Episode!) {
    hero(episode: $episode) {
      name
      id
      friends {
        name
        id
        appearsIn
      }
    }
  }
`;

type Hero = {
  name: string;
  id: string;
  appearsIn: string[];
  friends: Hero[];
};

type Response = {
  hero: Hero;
};

type Variables = {
  episode: string;
};

const withCharacter = graphql<{}, Response, Variables>(HERO_QUERY, {
  options: () => ({
    variables: { episode: "JEDI" }
  })
});

// export const XXX = withCharacter(({ data: { loading, hero, error } }) => {
//   if (loading) return <div>Loading</div>;
//   if (error) return <h1>ERROR</h1>;
//   return <div>{JSON.stringify(hero, null, 2)}</div>;
// });


const withCharacter2 = graphql<{}, Response, Variables>(HERO_QUERY, {
  options: () => ({
    variables: { episode: "JEDI" }
  })
});

class App3 extends React.Component<ChildDataProps<{}, Response, Variables>, {}> {
  render() {
    if (this.props.data.loading) return <div>Loading</div>;
    if (this.props.data.error) return <h1>ERROR</h1>;
    return <div>{JSON.stringify(this.props.data!.hero, null, 2)}</div>;
  }
}
const App3Container = withCharacter2(App3);

const App4: SFC<ChildDataProps<{}, Response, Variables>> = (props) => {
  if (props.data!.loading) return <div>Loading</div>;
  if (props.data!.error) return <h1>ERROR</h1>;
  return <div>{JSON.stringify(props.data!.hero, null, 2)}</div>;
};
const App4Container = withCharacter2(App4);

const withCharacter3 = graphql<{}, Response, {}, ChildDataProps<{}, Response>>(HERO_QUERY);
const App5: SFC<ChildDataProps<{}, Response>> = (props) => {
  if (props.data.loading) return <div>Loading</div>;
  if (props.data.error) return <h1>ERROR</h1>;
  return <div>{JSON.stringify(props.data.hero, null, 2)}</div>;
};
const App5Container = withCharacter3(App5);