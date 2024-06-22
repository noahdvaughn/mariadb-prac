import http from 'http'

const port = process.env.PORT || 3000 // Use environment variable or default port

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello from TypeScript server!')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
