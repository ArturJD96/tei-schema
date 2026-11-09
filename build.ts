import { readdirSync, readFileSync, writeFileSync } from "fs"
import { basename, join } from "path"
import * as yaml from "yaml"
import { xml2json } from "xml-js"

const SPECS_DIR = './TEI/P5/Source/Specs/'
const testTemplate = readFileSync('./schemas/test-template.yaml', 'utf8')

// specFileNames.forEach(spec => {
//   const name = spec.split('.')[0]
//   const dir = join('tei-specs', name)
//   const schema = dir + '.schema.yaml'
//   writeFileSync(dir + '.schema.yaml', testTemplate)
//   writeFileSync(dir + '.test.yaml', testTemplate)
// })

function parseSpecDict(dir: string): {[specName: string]: object} {
  const specFileNames = readdirSync(SPECS_DIR)
  const specEntries = specFileNames.map(fn => {
    const spec = basename(fn, '.xml')
    const path = join(dir, fn)
    const strXML = readFileSync(path, 'utf8')
    const json = JSON.parse(xml2json(strXML, { compact: false }))
    return [spec, json]
  })
  return Object.fromEntries(specEntries)
}

const specs = parseSpecDict(SPECS_DIR)

writeFileSync('tei-specs.json', JSON.stringify(specs, null, 2))
