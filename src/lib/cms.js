const BASE_URL = import.meta.env.VITE_CMS_BASE_URL
const API_KEY = import.meta.env.VITE_CMS_API_KEY

const cache = {}

export async function fetchCollection(collection) {
  if (cache[collection]) return cache[collection]

  const res = await fetch(`${BASE_URL}?collection=${collection}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  })

  if (!res.ok) throw new Error(`CMS error: ${res.status}`)

  const json = await res.json()
  const data = Array.isArray(json) ? json : json.data ?? []
  cache[collection] = data
  return data
}

export async function fetchEntry(collection, slug) {
  const items = await fetchCollection(collection)
  return items.find(item => item.slug === slug) ?? null
}
