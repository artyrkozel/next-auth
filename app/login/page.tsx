import { Signup, Login } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={Login}>Log in</button>
      <button formAction={Signup}>Sign up</button>
    </form>
  )
}