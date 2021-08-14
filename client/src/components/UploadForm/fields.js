export const fieldsList = [
  {
    title: 'Логист',
    name: 'logist',
    description: null,
    step: {
      index: 0,
      title: 'Основные данные',
      description: null,
    },
    display: false, // Отображать поле или нет
    cached: false, // Кешируемое поле. Проверять ранее сохраненное значение в localStore
    type: 'text', // Тип поля. Возможны варианты: 'text', 'number', 'select', 'checkbox', 'file', 'files'
    possibleValues: [], // Возможные варианты для полей типа 'select' или 'checkbox'
    required: true, // Обязательно к заполнению
    defaultValue: null,
    value: '',
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  },
  {
    title: 'Название партнера',
    name: 'partnerName',
    description: null,
    step: {
      index: 0,
      title: 'Основные данные',
      description: null,
    },
    display: true, // Отображать поле или нет
    cached: true, // Кешируемое поле. Проверять ранее сохраненное значение в localStore
    type: 'text', // Тип поля. Возможны варианты: 'text', 'number', 'select', 'checkbox', 'file', 'files'
    possibleValues: [], // Возможные варианты для полей типа 'select' или 'checkbox'
    required: true, // Обязательно к заполнению
    defaultValue: null,
    value: '',
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  },
  {
    title: 'Код АТИ',
    name: 'codeAti',
    description: null,
    step: {
      index: 0,
      title: 'Основные данные',
      description: null,
    },
    display: true, // Отображать поле или нет
    cached: true, // Кешируемое поле. Проверять ранее сохраненное значение в localStore
    type: 'text', // Тип поля. Возможны варианты: 'text', 'number', 'select', 'checkbox', 'file', 'files'
    possibleValues: [], // Возможные варианты для полей типа 'select' или 'checkbox'
    required: true, // Обязательно к заполнению
    defaultValue: null,
    value: '',
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  },
  {
    title: 'ИНН',
    name: 'inn',
    description: 'Индивидуальный номер налогоплательщика ИП состоит из 12 цифр, для АО/ПАО/ЗАО/ООО из 10.',
    step: {
      index: 0,
      title: 'Основные данные',
      description: null,
    },
    display: true, // Отображать поле или нет
    cached: true, // Кешируемое поле. Проверять ранее сохраненное значение в localStore
    type: 'number', // Тип поля. Возможны варианты: 'text', 'number', 'select', 'checkbox', 'file', 'files'
    possibleValues: null, // Возможные варианты для полей типа 'select' или 'checkbox'
    required: true, // Обязательно к заполнению
    defaultValue: null,
    value: '',
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  },
  {
    title: 'Форма собственности',
    name: 'ownershipType',
    description: null,
    step: {
      index: 0,
      title: 'Основные данные',
      description: null,
    },
    display: true, // Отображать поле или нет
    cached: false, // Кешируемое поле. Проверять ранее сохраненное значение в localStore
    type: 'checkbox', // Тип поля. Возможны варианты: 'text', 'number', 'select', 'checkbox', 'file', 'files'
    possibleValues: ['ИП', 'АО или ООО'], // Возможные варианты для полей типа 'select' или 'checkbox'
    required: true, // Обязательно к заполнению
    defaultValue: null,
    value: null,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  },
  {
    title: 'Реквизиты',
    name: 'credentials',
    description: 'Загрузите карту партнера',
    step: {
      index: 1,
      title: 'Перевозчик',
      description: null,
    },
    display: true, // Отображать поле или нет
    cached: true, // Кешируемое поле. Проверять ранее сохраненное значение в localStore
    type: 'files', // Тип поля. Возможны варианты: 'text', 'number', 'select', 'checkbox', 'file', 'files'
    possibleValues: [], // Возможные варианты для полей типа 'select' или 'checkbox'
    required: true, // Обязательно к заполнению
    defaultValue: null,
    value: null,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  },
  {
    title: 'Свидетельство ИНН',
    name: 'certificateInn',
    description: null,
    step: {
      index: 2,
      title: 'Перевозчик2',
      description: null,
    },
    display: true, // Отображать поле или нет
    cached: true, // Кешируемое поле. Проверять ранее сохраненное значение в localStore
    type: 'file', // Тип поля. Возможны варианты: 'text', 'number', 'select', 'checkbox', 'file', 'files'
    possibleValues: [], // Возможные варианты для полей типа 'select' или 'checkbox'
    required: true, // Обязательно к заполнению
    defaultValue: null,
    value: null,
    error: false,
    errorMessage: null,
    sending: false,
    sent: false,
  },
];
