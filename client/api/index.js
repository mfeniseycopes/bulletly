const statusMiddleware = response => {
  const jsonPromise = response.json()
  if (!response.ok) jsonPromise.then(json => {throw json;})
  return jsonPromise
}

const betterFetch = (path, options) =>
  fetch(path, options)
  .then(statusMiddleware)

export const fetchTopics = () =>
  betterFetch('/topics')

export const fetchTopic = id =>
  betterFetch(`/topics/${id}`)

export const postTopic = topic =>
  betterFetch('/topics', { type: 'POST' })

export const patchTopic = topic =>
  betterFetch(`/topics/${topic.id}`, { type: 'PUT' })

export const deleteTopic = id =>
  betterFetch(`/topics/${id}`, { type: 'DELETE' })
