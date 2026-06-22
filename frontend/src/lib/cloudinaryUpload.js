import imageCompression from 'browser-image-compression'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dmujz01ks'
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// ponytail: direct unsigned upload; use a signed backend endpoint if public preset limits are not enough.
const optimizeUrl = (url) => url.replace('/upload/', '/upload/f_auto,q_auto/')

export async function uploadImage(file, folder = 'settings') {
  if (!UPLOAD_PRESET) {
    throw new Error('VITE_CLOUDINARY_UPLOAD_PRESET غير مضبوط')
  }

  const compressed = await imageCompression(file, {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 1600,
    initialQuality: 0.82,
    useWebWorker: true,
  })

  const fd = new FormData()
  fd.append('file', compressed)
  fd.append('upload_preset', UPLOAD_PRESET)
  fd.append('folder', `soft-store/${folder}`)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: fd,
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error?.message || 'تعذر رفع الصورة إلى Cloudinary')
  }

  return optimizeUrl(data.secure_url)
}
