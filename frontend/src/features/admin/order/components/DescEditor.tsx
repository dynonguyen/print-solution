import { Box, makeStyles } from '@cads-ui/core';
import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

// -----------------------------
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'align',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'background'
];

const useStyles = makeStyles((theme) => ({
  quillRoot: {
    mt: 2,
    '& .quill': {
      maxH: 500,
      overflow: 'auto',
      position: 'relative',
      shadow: 4,
      border: 'none'
    },
    '& .ql-toolbar': {
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      bgColor: 'grey.200',
      __border: 'none',
      zIndex: 1,
      position: 'sticky',
      top: 0,
      left: 0
    },
    '& .ql-container': {
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      __border: 'none',
      minHeight: 250
    }
  }
}));

// -----------------------------
const DescEditor: React.FC<React.ComponentProps<typeof ReactQuill>> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.quillRoot}>
      <ReactQuill theme="snow" modules={modules} formats={formats} {...props} />
    </Box>
  );
};

export default DescEditor;
