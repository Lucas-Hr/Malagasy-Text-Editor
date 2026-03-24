// app/page.tsx
import Correcteur from '@/components/Correcteur'
import Image from 'next/image'
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-20">
      <div className="mx-auto">
        <div className="mb-10 flex items-center gap-4">
           <Image
              src="/malagasyFlag.png"
              alt="MLFLAG"
              width={200}
              height={200}
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mpamoaka lahatsoratra Malagasy
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <Correcteur />
        </div>
      </div>
    </main>
  )
}