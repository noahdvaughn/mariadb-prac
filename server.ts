import http from 'http'
import mariadb from 'mariadb'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3001

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: process.env.MARIA_USER,
  password: process.env.MARIA_PW,
  port: 3306,
  connectionLimit: 10
})
async function connectToMariaDB() {
  let conn
  try {
    conn = await pool.getConnection()
    console.log('Connected to MariaDB!')
  } catch (err) {
    console.error('Error connecting to MariaDB:', err)
  } finally {
    if (conn) conn.release()
  }
}

connectToMariaDB()

const server = http.createServer(async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello from TypeScript server!')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
