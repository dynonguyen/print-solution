import { Alert, Button, Dialog, FieldLabel, Flex, Input } from '@cads-ui/core';
import { Box } from '@mui/material';
import to from 'await-to-js';
import { getOperationAST } from 'graphql';
import React from 'react';
import { toast } from 'react-toastify';
import Icon from '~/components/Icon';
import SearchBar from '~/components/SearchBar';
import UploadFile from '~/components/UploadFile';
import { ENDPOINTS } from '~/constants/endpoints';
import { SUCCESS_CODE } from '~/constants/status-code';
import { MAX } from '~/constants/validation';
import { AdminCategoryListDocument, useAddCategoryMutation } from '~/graphql/catalog/generated/graphql';
import docsAxios from '~/libs/axios/docs';
import orderAxios from '~/libs/axios/order';
import { fileReader } from '~/utils/file-reader';
import { getFileExt } from '~/utils/helper';

// -----------------------------
interface FileForm {
  name: string;
  fileUpload: File | null;
}

const defaultForm: FileForm = { name: '', fileUpload: null };

// -----------------------------
const UploadFiles = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({ field: '', msg: '' });
  const [files, setFiles] = React.useState<File[] | FileList>([])
  const [loading, setLoading] = React.useState(false);

  const handleCloseForm = () => {
    setError({ field: '', msg: '' });
    setOpen(false);
  };

  const handleUserUploadFiles = async () => {
    setLoading(true);
    try {
      if (!files || files.length === 0) return setError({ field: 'filesUpload', msg: 'Vui lòng chọn ít nhất 1 file' });

      const formData = [];
      const listFilesName = [];

      for (const file of files) {
        const fileDataUrl = await fileReader(file);
        formData.push(fileDataUrl)
        listFilesName.push(file.name)
      }

      console.log("dataUploading: ", formData);

      const [uploadErr, uploadResult] = await to(
        orderAxios.post(ENDPOINTS.ORDER_API.CREATE, {
          listFiles: formData,
          listFilesName: listFilesName
        })
      );
    } catch (error) {
      console.log("____ERROR: ", error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <React.Fragment>
      <Box marginY={2}>
        <Button
          size='small'
          fullWidth
          sm={{ fullWidth: false }}
          endIcon={<Icon icon="material-symbols:add" />}
          onClick={() => setOpen(true)}
        >
          Tải tài liệu
        </Button>
      </Box>

      <Dialog
        open={open}
        PopoverProps={{ disabledBackdropClick: true, unmountOnExit: true }}
        onClose={handleCloseForm}
        header="Chọn tài liệu cần in ấn"
        body={
          <Flex direction="column" spacing={3}>
            {error.msg && <Alert type="error">{error.msg}</Alert>}
            <FieldLabel error={error.field === 'filesUpload'}>
              <UploadFile
                maxFiles={1000}
                onFileChange={(files) => setFiles(files)}
                maxSizePerFile={2000}
              />
            </FieldLabel>
          </Flex>
        }
        hideDivider
        sx={{ minW: 450 }}
        maxWidth="md"
        action={
          <Flex spacing={2}>
            <Button variant="soft" color="grey" onClick={handleCloseForm}>
              Hủy
            </Button>
            <Button onClick={handleUserUploadFiles} loading={loading}>
              Tải lên
            </Button>
          </Flex>
        }
      />
    </React.Fragment>
  );
};

export default UploadFiles;
