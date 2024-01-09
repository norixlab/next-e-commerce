'use client'
import toast from 'react-hot-toast'

export default function Home() {
  const notify = () => toast.success('Here is your toast.');
  return (
    <main className="flex flex-col grow justify-center items-center">
      <div>
        <button onClick={notify}>click me</button>
      </div>
    </main>
  )
}
