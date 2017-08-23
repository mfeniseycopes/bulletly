// HELPERS

const statusMiddleware = response => 
  response.ok ?
    response.json() :
    response.json().then(json => {throw json;})

const defaults = { 
  headers: { 'Content-Type': 'application/json' },
}

// improved `fetch` that will respond to success for 2XX
// and catch for others
const betterFetch = (path, options) =>
  fetch(path, { ...defaults, ...options })
    .then(statusMiddleware)

// API CALLS 

export const fetchTopics = () =>
  betterFetch('/topics')

export const fetchTopic = id =>
  betterFetch(`/topics/${id}`)

export const postTopic = topic =>
  betterFetch('/topics', 
    { method: 'post', body: JSON.stringify(topic) })

export const putTopic = topic =>
  betterFetch(`/topics/${topic.id}`,
    { method: 'put', body: JSON.stringify(topic) })

export const deleteTopic = id =>
  betterFetch(`/topics/${id}`, { method: 'delete' })

export const fetchBullets = () =>
  betterFetch('/bullets')

export const fetchBullet = id =>
  betterFetch(`/bullets/${id}`)

export const postBullet = bullet =>
  betterFetch('/bullets', { method: 'post', body: JSON.stringify(bullet) })

export const putBullet = bullet =>
  betterFetch(`/bullets${bullet.id}`, { method: 'put', body: JSON.stringify(bullet) })

export const deleteBullet = id =>
  betterFetch(`/bullets/${id}`, { method: 'delete' })
