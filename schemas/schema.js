// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'blog',
      type: 'document',
      title: 'Blog',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: "title"
          }
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'date',
          title: 'Date',
          type: 'datetime',
        },
        {
          name: 'coin',
          title: 'Coin',
          type: 'string',
        }
      ],
    },
    {
      name: 'coin',
      type: 'document',
      title: 'Coin',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: "title"
          }
        },
        {
          name: 'excerpt',
          title: 'Excerpt',
          type: 'string',
        },
        {
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
        }
      ],
    }
  ]),
})
