import { type SchemaTypeDefinition } from 'sanity'

import {artwork} from './artwork'

import {logo} from './logo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artwork, logo],
}
