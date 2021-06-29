import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';


export default function FilesUploader({ label, textHelper, required, multiple, store, setStore }) {
  // Разрешенные расширения файлов
  const acceptFile = '.pdf, .png, .bmp, .jpeg, .jpg, .gif, .doc, .docx, .txt, .ods, .odt, .xls, .xlsx';
  // Максимальный размер файлов в байтах
  const maxSizeFile = 20971520;

  const handleOnChange = (event) => {
    const files = event.target.files;
    let err = false;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > maxSizeFile) {
        setStore({
          message: `Файл ${files[i].name} слишком большой. Размер файла не должен превышать 20 МБ!`,
          files: store.files,
        });
        err = true;
        break;
      }
    }
    if (!err) {
      setStore({
        message: null,
        files: files,
      });
    }
  };

  
  const renderFiles = (fileList) => {
    let arr = [];
    for (let i = 0; i < fileList.length; i++) {
      arr.push(fileList[i]);
    }
    return (
      <Box>
        {arr.map(file => 
          <Box>
            <Typography>Загружен: {file.name}</Typography>
          </Box>  
        )}
      </Box>
    )
  }

  return (
    <Box>
      <TextField
        required={required}
        style={{ marginTop: 16 }}
        variant="outlined"
        fullWidth
        label={label}
        multiline
        rows={store.files.length > 3 ? store.files.length : 3}
        error={store.message}
        value={store.files.length === 0 ? textHelper : ' '}
        helperText={store.message}
        InputProps={{
          startAdornment: 
            <InputAdornment position="start">
              <input
                style={{ display: 'none' }}
                accept={acceptFile}
                id={`contained-button-file-${label}`}
                multiple={multiple}
                type="file"
                onChange={handleOnChange}
              />
              <label htmlFor={`contained-button-file-${label}`}>
                <Button
                  variant="contained" 
                  color="primary" 
                  component="span"
                >
                  Загрузить
                </Button>
              </label>
            </InputAdornment>,
          endAdornment:
            <InputAdornment position="end">
              {renderFiles(store.files)}
            </InputAdornment>
        }}
      />

      
      
    </Box>
  )
}