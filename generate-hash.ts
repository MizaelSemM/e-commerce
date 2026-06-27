import bcrypt from 'bcryptjs'

async function main() {
  // gerar-hash.ts
const hash = await bcrypt.hash('freefire213', 10)
console.log(hash)
}

main()