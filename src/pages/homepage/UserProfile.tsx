import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/context/AuthProvider"
import { getUserInfo } from "@/services/api/userapi"

export default function UserProfile() {
  const { user_id, token } = useAuth()
  const data = getUserInfo(user_id)
  const user_data = data[0]

  return (
    <Card className="w-1/6 h-2/6 m-10">
      <CardHeader className="pb-2">
        <CardTitle>User Profile</CardTitle>

        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar className="h-20 w-20">
          <AvatarImage src={user_data.profile_pic} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="my-4 flex-1">
          <p className="font-light text-sm text-gray-500">Username</p>
          <p>{user_data.username}</p>
        </div>
        <div className="my-4 flex-1">
          <p className="font-light text-sm text-gray-500">Email</p>
          <p>{user_data.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}
