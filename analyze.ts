import { readFileSync, writeFileSync } from "fs"
import { xml2json } from "xml-js"
import jsonata from "jsonata"
import specs from "./dist/tei-specs.json" with { type: 'json' };

// const specs = await import("./tei-specs.json") as const

/*
  For us, to read TEI specs, we need to know:
  1) what tags are used in tag definitions
  2) how definitions are defined (i.e. how spec's tags and attributes shape their definitions).

  Premises:
  1) TEI is defined in TEI.
  2) TEI tags definitions are at './TEI/P5/Source/Specs/'
  3) Only top-level tags of spec tells us what it does.
*/


async function query(obj: object, query: string) {
  const result = await jsonata(query).evaluate(obj)
  return JSON.parse(JSON.stringify(result))
}

const queryTagsBySpecType = readFileSync('./jsonata/specByType.jsonata', 'utf8')

const tagsBySpecType = await query(specs, queryTagsBySpecType)

console.log(tagsBySpecType)
// console.log(tagsBySpecType.classSpec['att.textCritical'])
process.exit()


type TagHandler = (spec: object, schema:object) => void
type SpecTypeHandlers = Record<keyof typeof tagsBySpecType, TagHandler>

class NotImplementedError extends Error {
  constructor(handledItem: string, handlerType: 'argument') {
    super(`Handler for ${handlerType} ${handledItem} is not implemented`)
  }
}

const specTypeHandlers: SpecTypeHandlers = {

  /**
   * Parses classSpec features
   * as JSON Schema definitions.
   * @param spec
   * @param schema
   */
  classSpec: (spec, schema) => {

    const attrHandlers = {

      key: (element, schema) => {

      }

    }

//     for (const attr in spec.attributes) {
//
//       const val = spec.attributes[attr]
//       const handler = attrHandlers[attr]
//
//       if (handler === undefined) {
//         throw new NotImplementedError(attr, 'argument')
//       }
//
//       handler(spec, schema)
//       console.log(attr, val)
//
//     }

    /*
      1) Create a $def,
      2)
    */

  },

  elementSpec: (spec, schema) => { },

  macroSpec: (spec, schema) => { },

  dataSpec: (spec, schema) => {}

}

/*

  1) Process all classes




*/

const SCHEMA = {

  "$schema": "https://json-schema.org/draft/2020-12/schema#",
  "$id": "TEI",
  "$defs": {}

}

for (const specType in tagsBySpecType) {

  const specs = tagsBySpecType[specType]
  const handler = specTypeHandlers[specType]

  if (handler === undefined) {
    throw Error(`Handler for ${specType} is not defined.`)
  }

  for (const specIdent in specs) {

    const spec = specs[specIdent]
    const handled = handler(spec, SCHEMA)

  }

}




/*
  spec.xml -> jsonata tag handler
  spec.xml -> spec.json (non-compressed) ->

  model.oddSpec
  classRef dataRef elementRef macroRef moduleRef

  model.oddDecl
  * classSpec
  * constraintSpec
  * dataSpec
  * elementSpec
  * macroSpec
  * moduleSpec
  * outputRendition
  * specGrp
  * specGrpRef

  TASKS: group elements by classes they belong to.

  0) Get all classes.
  1) Group definitions by classes they belong to.
    – if type="attr", member inherits attributes.

  class: model.contentPart

  {
    "$defs": {
      elemSome: {...}
      model.dupa: {
        anyOf: {
          $ref: #/$defs/elemSome
        }
      }
    }
  }



*/
