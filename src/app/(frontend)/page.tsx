import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
            <Image
              alt="Payload Logo"
              height={65}
              src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
              width={65}
              className="mx-auto"
            />
          </div>
          {!user && <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to your new project.</h1>}
          {user && <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome back, <span className="text-blue-600">{user.email}</span></h1>}
          <p className="text-lg text-gray-600 mb-8">Your Payload CMS is ready with Tailwind CSS 4!</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border-2 border-gray-300 hover:border-gray-400"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 mb-2">Update this page by editing</p>
          <a className="inline-block bg-gray-800 text-white px-3 py-1 rounded text-sm font-mono hover:bg-gray-700 transition-colors" href={fileURL}>
            app/(frontend)/page.tsx
          </a>
        </div>
      </div>
    </div>
  )
}
