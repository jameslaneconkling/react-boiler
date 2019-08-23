import {
  compose,
} from 'recompose'
import App from '../../components/App'


type ContainerProps = {}

export type Props = ContainerProps

export default compose<Props, ContainerProps>()(App)
