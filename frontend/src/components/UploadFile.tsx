import { Flex, List, Typography, useEffectNotFirst } from '@cads-ui/core';
import React from 'react';
import { toast } from 'react-toastify';
import { FILE_EXT_ICON_MAPPING } from '~/constants/mapping';
import { getFileExt } from '~/utils/helper';
import Icon from './Icon';

// -----------------------------
const ACCEPT_ALL = 'all';

function validateFile(file: File, acceptFiles: string, maxSize: number) {
  if (acceptFiles !== ACCEPT_ALL) {
    const extFile = getFileExt(file.name);
    if (!acceptFiles.split(',').includes(extFile)) return { valid: false, message: 'Loại file không hợp lệ' };
  }

  const isValidSize = Math.round(file.size / (1024 * 1024)) <= maxSize;

  return {
    valid: isValidSize,
    message: isValidSize ? '' : `Kích thước file phải nhỏ hơn ${maxSize}MB`
  };
}

// -----------------------------
interface UploadFileProps {
  uploadTitle?: string;
  acceptFiles?: 'all' | string; // ex: '.docx,doc,.xlsx'
  maxSizePerFile?: number; // by MB
  maxFiles?: number;
  ListProps?: Omit<React.ComponentProps<typeof List>, 'items'>;
  onFileChange?: (files: FileList | File[]) => any;
}

export interface UploadFileRef {
  reset: Function;
}

// -----------------------------
const UploadFile = React.forwardRef<UploadFileRef, UploadFileProps>((props, ref) => {
  const { uploadTitle, acceptFiles = ACCEPT_ALL, maxSizePerFile = 2, maxFiles = 1, onFileChange, ListProps } = props;
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (fileList: FileList) => {
    const len = fileList.length;

    if (fileList && len) {
      if (len + files.length > maxFiles) {
        toast.error(`Số file tối đa là ${maxFiles}`);
        return;
      }

      for (const file of fileList) {
        const fileName = file.name;
        if (files.findIndex((f) => f.name === fileName) !== -1) {
          toast.error(`File đã tồn tại ${fileName}`);
          return;
        }
        const fileChecked = validateFile(file, acceptFiles, maxSizePerFile);
        if (!fileChecked.valid) {
          toast.error(fileChecked.message);
          return;
        }
      }

      setFiles([...files, ...Array.from(fileList)]);
    }
  };

  const handleDeleteFile = (file: File) => {
    setFiles(files.filter((f) => f.name !== file.name));
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffectNotFirst(() => {
    onFileChange && onFileChange(files);
  }, [files]);

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      setFiles([]);
      if (inputRef.current) inputRef.current.value = '';
    }
  }));

  return (
    <React.Fragment>
      <input
        multiple={maxFiles > 1}
        type="file"
        hidden
        onChange={(e) => handleFileChange(e.target.files as FileList)}
        ref={inputRef}
        accept={acceptFiles}
      />

      {files.length > 0 ? (
        <List
          {...ListProps}
          sx={{ '& .cads-list-item': { borderRadius: 2 }, ...ListProps?.sx }}
          items={files.map((file) => ({
            primary: file.name,
            secondary: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
            icon: <Icon icon={FILE_EXT_ICON_MAPPING[getFileExt(file.name)]} />,
            action: (
              <Icon
                sx={{ fs: 24, color: 'text.secondary', _hover: { color: 'error.main' } }}
                icon="mdi:bin"
                onClick={(e) => {
                  handleDeleteFile(file);
                  e.preventDefault();
                }}
              />
            )
          }))}
        />
      ) : (
        <Flex
          direction="column"
          center
          spacing={3}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            handleFileChange(e.dataTransfer.files);
            e.preventDefault();
          }}
          sx={{
            px: 4,
            py: 8,
            border: 'dashed 2px',
            borderColor: 'secondary.light',
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'all 0.2s',
            '& *': { color: 'secondary.light', transition: 'all 0.2s' },
            _hover: { borderColor: 'primary.dark', '& *': { color: 'primary.dark' } }
          }}
        >
          <Icon icon="material-symbols:cloud-upload" sx={{ fs: 48 }} />
          <Flex direction="column" spacing={1} center>
            <Typography>{uploadTitle || 'Kéo thả file của bạn vào đây hoặc click để chọn file'}</Typography>
            <Typography>{acceptFiles !== ACCEPT_ALL ? acceptFiles : ''}</Typography>
            <Typography>
              Kích thước tối đa {maxSizePerFile}MB - Tối đa {maxFiles} file
            </Typography>
          </Flex>
        </Flex>
      )}
    </React.Fragment>
  );
});

export default UploadFile;
