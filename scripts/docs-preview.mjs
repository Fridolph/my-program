import { spawnSync } from 'node:child_process'

const forwardedArgs = process.argv.slice(2)

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run('pnpm', ['docs:build'])
run('node', ['scripts/sync-docs-static.mjs'])
run('pnpm', ['-C', './docs-site', 'preview', ...forwardedArgs])

