// HELPERS

const statusMiddleware = response => 
  response.ok ?
    response.json() :
    response.json().then(json => {throw json;})

// improved `fetch` that will respond to success for 2XX
// and catch for others
const betterFetch = (path, options) =>
  fetch(path, options)
    .then(statusMiddleware)

// API CALLS 

export const fetchTopics = () =>
  betterFetch('/topics')

export const fetchTopic = id =>
  betterFetch(`/topics/${id}`)

export const postTopic = topic =>
  betterFetch('/topics', { method: 'POST' })

export const patchTopic = topic =>
  betterFetch(`/topics/${topic.id}`, { method: 'PUT' })

export const deleteTopic = id =>
  betterFetch(`/topics/${id}`, { method: 'DELETE' })

export const fetchBullets = () =>
  betterFetch('/bullets')

export const fetchBullet = id =>
  betterFetch(`/bullets/${id}`)

export const postBullet = bullet =>
  betterFetch('/bullets', { method: 'POST', body: bullet })

export const putBullet = bullet =>
  betterFetch(`/bullets${bullet.id}`, { method: 'PUT', body: bullet })

export const deleteBullet = id =>
  betterFetch(`/bullets/${id}`, { method: 'DELETE' })
