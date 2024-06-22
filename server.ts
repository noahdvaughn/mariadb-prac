import http from 'http'
import mariadb from 'mariadb'

const port = process.env.PORT || 3000

const pool = mariadb.createPool({
  host: process.env.MARIA_HOST,
  user: process.env.MARIA_USER,
  password: process.env.MARIA_PW,
  database: process.env.MARIA_DB
})

const server = http.createServer(async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello from TypeScript server!')
  try {
    const conn = await pool.getConnection()
    const rows = await conn.query('SELECT 1 as val')
    console.log('Connection successful:', rows)

    conn.release()
  } catch (err) {
    console.error('Error connecting to MariaDB:', err)
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello from TypeScript server!')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
