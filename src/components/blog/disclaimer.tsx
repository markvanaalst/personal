import { Card, CardContent, CardHeader } from '../ui/card/card'

const Profile = () => {
  return (
    <Card>
      <CardHeader>The legal stuff</CardHeader>
      <CardContent className="w-full max-w-xs  text-center ">
        <p className="px-8 py-2 text-xs">
          This is a weblog, most commonly referred to as a “blog”. The opinions
          and thoughts expressed here represent my own and are NOT those of my
          employer, any associations, or any other organizations I am a member
          of.
        </p>
      </CardContent>
    </Card>
  )
}

export default Profile
