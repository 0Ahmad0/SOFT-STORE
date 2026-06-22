const { v2: cloudinary } = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const publicIdFromUrl = (url) => {
  if (!url || !url.includes('/image/upload/')) return null
  const path = url.split('/image/upload/')[1].split(/[?#]/)[0]
  const parts = path.split('/').filter(Boolean)
  if (parts[0]?.includes(',')) parts.shift()
  if (/^v\d+$/.test(parts[0])) parts.shift()
  return parts.join('/').replace(/\.[^.]+$/, '') || null
}

const deleteImage = async (url) => {
  const publicId = publicIdFromUrl(url)
  if (!publicId || !process.env.CLOUDINARY_API_SECRET) return
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.warn(`Cloudinary delete failed for ${publicId}: ${error.message}`)
  }
}

module.exports = { deleteImage, publicIdFromUrl }
