import { LoginForm } from "./LoginForm"
import LoginImage from "./LoginImage"

export default function Login() {
  return (
    <div className="flex mb-4 h-screen">
      <div className="w-1/2 h-full p-10 flex flex-col justify-center items-center">
        <LoginForm />
      </div>
      <div className="w-1/2 bg-gray-400 h-full">
        <LoginImage />
      </div>
    </div>
  )
}
