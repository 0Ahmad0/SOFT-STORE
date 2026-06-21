import React from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function AdminNotice({ notice, onClose }) {
  if (!notice) return null
  const isError = notice.type === 'error'

  return (
    <div
      className={`mb-4 flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      <div className="flex items-center gap-2">
        {isError ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        <span>{notice.message}</span>
      </div>
      <button type="button" onClick={onClose} className="text-current opacity-60 hover:opacity-100">
        اغلاق
      </button>
    </div>
  )
}
