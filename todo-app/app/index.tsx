
import { Href, Redirect } from 'expo-router'

// 22 : 47
const index = () => {

  const loginRoute = '/(authenticate)/login' as Href;
  return (
    <Redirect href={loginRoute}/>
  )
}

export default index

