const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const app = express();
app.use(cors({ credentials: true }));

app.put('/contract/:inn', function uploader(req, res, next) {
  try {
    const { inn } = req.params;
    
    // Каталог для загрузки файлов
    const uploadsPath = path.join(process.cwd(), 'uploads');

    // Создаем временный каталог с именем "temp№ИНН"
    fs.mkdir(path.join(uploadsPath, `temp${inn}`), { recursive: true }, (err) => err ? console.error(err) : undefined);

    const form = new formidable.IncomingForm();
    
    // Парсим входящую web-форму
    form.parse(req, (err, fields, files) => {
      // Файлы
      Object.keys(files).forEach((key) => {
        // Сохраняем каждый файл
        fs.writeFileSync(path.join(uploadsPath, `temp${inn}`, `[${key}] ${files[key].name}`), fs.readFileSync(files[key].path), (err) => err ? console.error(err) : undefined);
      });

      // Текстовые поля
      Object.keys(fields).forEach((key) => {
        if (key === 'FINISH') {
          // Если пришло контролькое поле, переименовываем каталог и завершаем работу с данным ИНН
          fs.rename(path.join(uploadsPath, `temp${inn}`), path.join(uploadsPath, `${inn}`), (err) => err ? console.error(err) : undefined);
        } else {
          // сохраняем все текстовые поля в один файл
          fs.appendFile(path.join(uploadsPath, `temp${inn}`, `data.txt`), `${key}: ${fields[key]}\n`, (err) => err ? console.error(err) : undefined);
        }
      });
    });

    res.status(201).json({
      message: 'Форма успешно загружена',
      result: 'success',
    });

  } catch(err) {
    console.error(err);

    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      result: 'error',
    });
  }
});

app.put('/upload-form/:inn', function uploader(req, res, next) {
  try {
    const { inn } = req.params;

    // Каталог для загрузки файлов
    const uploadsPath = path.join(process.cwd(), 'uploads');

    // Создаем временный каталог с именем "temp№ИНН"
    fs.mkdir(path.join(uploadsPath, `temp${inn}`), { recursive: true }, (err) => err ? console.error(err) : undefined);

    const form = new formidable.IncomingForm();

    // Парсим входящую web-форму
    form.parse(req, (err, fields, files) => {
      // Файлы
      Object.keys(files).forEach((key) => {
        // Сохраняем каждый файл
        fs.writeFileSync(path.join(uploadsPath, `temp${inn}`, `[${key}] ${files[key].name}`), fs.readFileSync(files[key].path), (err) => err ? console.error(err) : undefined);
      });

      // Текстовые поля
      Object.keys(fields).forEach((key) => {
        if (key === 'FINISH') {
          // Если пришло контрольное поле, переименовываем каталог и завершаем работу с данным ИНН
          fs.rename(path.join(uploadsPath, `temp${inn}`), path.join(uploadsPath, `${inn}`), (err) => err ? console.error(err) : undefined);
        } else {
          // сохраняем все текстовые поля в один файл
          fs.appendFile(path.join(uploadsPath, `temp${inn}`, `data.txt`), `${key}: ${fields[key]}\n`, (err) => err ? console.error(err) : undefined);
        }
      });
    });

    res.status(201).json({
      message: 'Форма успешно загружена',
      result: 'success',
    });

  } catch(err) {
    console.error(err);

    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      result: 'error',
    });
  }
});


app.use(function(req, res, next) {
  res.redirect('http://4carrier.ru/');
});


const server = http.createServer(app);
server.listen(8080);