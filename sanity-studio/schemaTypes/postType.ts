import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    }),
    defineField({
      title: 'Photo',
      name: 'photo',
      type: 'image',
    }),
    defineField({
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            defineField({
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            }),
            defineField({
              title: 'Text',
              name: 'text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'comments.0.text',
      authorName: 'author.name',
      authorUserName: 'author.userName',
      media: 'photo',
    },
    prepare(selection) {
      const {title, authorName, authorUserName, media} = selection

      return {
        title,
        subtitle: `by ${authorName} (${authorUserName})`,
        media,
      }
    },
  },
})
