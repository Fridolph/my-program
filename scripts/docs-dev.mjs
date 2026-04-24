import { spawn } from 'node:child_process'

const args = ['-C', './docs-site', 'dev', ...process.argv.slice(2)]

const child = spawn('pnpm', args, {
  stdio: 'inherit',
  shell: false
})

child.on('exit', code => {
  process.exit(code ?? 0)
})

