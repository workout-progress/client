'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace('/dashboard')
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6">Login</h1>

      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text"
          name="email"
          placeholder="Digite seu e-mail"
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          type="submit"
          className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Log in
        </button>
      </form>

      <div className="mt-6">
        <Link href="/sign-up">Criar Conta</Link>
      </div>
    </main>
  )
}
