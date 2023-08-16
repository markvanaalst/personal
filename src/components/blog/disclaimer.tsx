import { Card, CardContent } from '../ui/card/card'

const Profile = () => {
  return (
    <Card>
      <CardContent className="w-full max-w-xs p-4 mt-4 mb-8 overflow-hidden text-center ">
        <strong>The legal stuff</strong>
        <p className="px-8 py-2 text-sm">
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
