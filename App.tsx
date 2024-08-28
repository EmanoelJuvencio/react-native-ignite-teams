import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme/index'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { Players } from '@screens/Players'
// import { Groups } from '@screens/Groups'
// import { NewGroup } from '@screens/NewGroup'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {/* {fontsLoaded ? <Groups /> : <Loading />} */}
      {/* {fontsLoaded ? <NewGroup /> : <Loading />} */}
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  )
}
