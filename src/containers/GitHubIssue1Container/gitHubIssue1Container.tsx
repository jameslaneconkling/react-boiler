// /* tslint:disable */
// import React from 'react'
// import { graphql, ChildDataProps, ChildProps } from 'react-apollo'
// import gql from 'graphql-tag'

export default () => {};

// const historyQuery = gql`
//   query history($solutionId: String) {
//     history(solutionId: $solutionId) {
//       solutionId
//       delta
//     }
//   }`

// interface Data {
//   history: string[]
// }

// interface Props {
//   solutionId: string
// }

// const withHistory = graphql<Props, Data, Props, ChildDataProps<{}, Data>>(historyQuery,
//   {
//     options: (ownProps) => ({
//       variables: {
//         solutionId: ownProps.solutionId
//       }
//     })
//   })

// export class HistoryView extends React.Component<ChildProps<{}, Data>, {}> {
//   render() {
//     return <div />
//   }
// }

// export default withHistory(HistoryView)


// const withCharacter2 = graphql<Props, Data>(historyQuery, {
//   options: ({ solutionId }) => ({
//     variables: { solutionId }
//   })
// });

// class App3 extends React.Component<ChildDataProps<{}, Data>, {}> {
//   render() {
//     if (this.props.data.loading) return <div>Loading</div>;
//     if (this.props.data.error) return <h1>ERROR</h1>;
//     return <div>{JSON.stringify(this.props.data!.history, null, 2)}</div>;
//   }
// }
// const App3Container = withCharacter2(App3);