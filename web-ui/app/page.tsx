import getMe from '@/actions/users/get-me'

export default async function Home() {
  const me = await getMe()
  console.log(me)

  return <></>
}
