import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'docs-site', '.vitepress', 'dist')
const publicDir = path.join(rootDir, 'public')
const viewsDir = path.join(rootDir, 'views')

function ensureDir(target) {
  fs.mkdirSync(target, { recursive: true })
}

function copyDirectoryContents(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    return
  }

  ensureDir(targetDir)

  for (const entry of fs.readdirSync(sourceDir)) {
    fs.cpSync(path.join(sourceDir, entry), path.join(targetDir, entry), {
      recursive: true,
      force: true
    })
  }
}

ensureDir(distDir)
copyDirectoryContents(publicDir, distDir)

const legacyTargetDir = path.join(distDir, 'views')
ensureDir(legacyTargetDir)
fs.copyFileSync(path.join(viewsDir, 'index.html'), path.join(legacyTargetDir, 'index.html'))

console.log('Synced public/ and views/ into docs-site/.vitepress/dist')
