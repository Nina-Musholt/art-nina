import {UserIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const logo = defineType({
  name: 'logo',
  title: 'Logo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
})