const BASE_URL = import.meta.env.VITE_CMS_BASE_URL
const API_KEY = import.meta.env.VITE_CMS_API_KEY

const cache = {}

export async function fetchCollection(collection) {
  if (cache[collection]) return cache[collection]
  if (!BASE_URL || !API_KEY) return []

  try {
    const res = await fetch(`${BASE_URL}?collection=${collection}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })

    if (!res.ok) return []

    const text = await res.text()
    const json = JSON.parse(text)
    const data = Array.isArray(json) ? json : json.data ?? []
    cache[collection] = data
    return data
  } catch {
    return []
  }
}

export async function fetchEntry(collection, slug) {
  const items = await fetchCollection(collection)
  return items.find(item => item.slug === slug) ?? null
}
