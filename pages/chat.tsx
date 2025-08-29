import Chat from '@/components/Chat'
import React from 'react'

const chat = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8">
            <div className="container mx-auto px-4">
                <Chat />
            </div>
        </div>
    )
}

export default chat
