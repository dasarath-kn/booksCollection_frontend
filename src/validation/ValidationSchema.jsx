import * as Yup from 'yup';

const ValidationSchema = Yup.object({
  bookname: Yup.string()
    .trim() 
    .required('Book name is required')
    .min(2, 'Book name must be at least 2 characters long'),

  authorname: Yup.string()
    .trim() 
    .required('Author name is required')
    .min(2, 'Author name must be at least 2 characters long'),

  description: Yup.string()
    .trim()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),

  publicationyear: Yup.string()
    .trim()
    .required('Publication year is required')
    .matches(
      /^[12][0-9]{3}$/,
      'Publication year must be a valid year (e.g., 2023)'
    ),

  pages: Yup.number()
    .required('Number of pages is required')
    .positive('Number of pages must be positive')
    .integer('Number of pages must be an integer')
    .min(1, 'There must be at least one page'),

  language: Yup.string()
    .trim()
    .required('Language is required')
    .min(2, 'Language name must be at least 2 characters long')
    .matches(/^[A-Za-z\s]+$/, 'Language must not contain numbers'),

  publisher: Yup.string()
    .trim()
    .required('Publisher is required')
    .min(2, 'Publisher name must be at least 2 characters long')
    .matches(/^[A-Za-z\s]+$/, 'Publisher must not contain numbers'),
});

export default ValidationSchema;
