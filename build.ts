import { fstatSync, lstatSync, mkdirSync, readdirSync, writeFileSync } from "fs"
import { basename, join } from "path"

const sources = './TEI/P5/Source/Specs/'

const specs = readdirSync(sources)

specs.forEach(spec => {
  const name = spec.split('.')[0]
  const dir = join('tei-specs', name)
  // mkdirSync(dir)
  const schema = join(dir, )
  // writeFileSync(schema, '{}')
  console.log(dir + '.schema.json')
})
