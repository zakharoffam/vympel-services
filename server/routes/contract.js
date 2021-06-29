const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

// Каталог куда будем загружать файлы
const uploadsPath = path.join(process.cwd(), 'uploads');

router.put('/:inn', function(req, res, next) {
  const { inn } = req.params;

  // Создаем временный каталог для загрузки файлов
  fs.mkdir(path.join(uploadsPath, `temp${inn}`), { recursive: true }, (err) => err ? console.error(err) : undefined);

  const form = new formidable.IncomingForm();

  // Сохраняем входящие файлы
  form.on('fileBegin', function (name, file){
    file.path = path.join(uploadsPath, `temp${inn}`, `[${name}] ${file.name}`);
  });
  form.on('file', function (name, file){
    // console.log('Uploaded ' + file.name);
  });

  // Сохраняем все текстовые поля в файл data.txt
  form.parse(req, (err, fields, files) => {
    Object.keys(fields).forEach(key => {
      fs.appendFile(path.join(uploadsPath, `temp${inn}`, `data.txt`), `${key}: ${fields[key]}\n`, (err) => err ? console.error(err) : undefined);
    });
  });

  // Сохраняем полностью и переименновываем каталог
  form.parse(req, (err, fields, files) => {
    if ('FINISH' in fields) {
      fs.rename(
        path.join(uploadsPath, `temp${inn}`),
        path.join(uploadsPath, `${inn}`),
        (err) => err ? console.error(err) : undefined,
      );
    }
  });

  // Возвращаем успешный ответ
  res.status(200).json({ result: 'success' })
});


module.exports = router;
